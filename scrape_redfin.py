"""
Redfin CSV Loader
Loads a downloaded Redfin CSV into PostgreSQL.

Usage:
    pip install pandas psycopg2-binary
    export DATABASE_URL="your External Database URL from Render"
    python scrape_redfin.py redfin_2026-04-06-13-01-58.csv
"""

import os
import sys
import pandas as pd
import psycopg2

DATABASE_URL = os.environ.get("DATABASE_URL")


def create_table(conn):
    with conn.cursor() as cur:
        cur.execute("""
            CREATE TABLE IF NOT EXISTS rentals (
                id SERIAL PRIMARY KEY,
                address TEXT NOT NULL,
                city TEXT,
                state TEXT,
                zip_code TEXT,
                house_value REAL,
                estimated_rent REAL,
                bedrooms INTEGER,
                bathrooms REAL,
                square_feet INTEGER,
                lot_size INTEGER,
                year_built INTEGER,
                property_type TEXT,
                hoa_per_month REAL,
                days_on_market INTEGER,
                redfin_url TEXT,
                latitude REAL,
                longitude REAL,
                scraped_at TIMESTAMP DEFAULT NOW(),
                UNIQUE(address)
            );
        """)
    conn.commit()
    print("Table 'rentals' ready.")


def load_csv(filepath, conn):
    df = pd.read_csv(filepath)

    # Drop the MLS disclaimer row
    df = df.dropna(subset=["ADDRESS"])
    df = df[df["ADDRESS"].str.strip() != ""]
    # Drop rows that look like disclaimers
    df = df[~df["ADDRESS"].str.contains("In accordance", case=False, na=False)]

    print(f"Loaded {len(df)} listings from CSV.")

    # Estimate rent as 0.5% of home value per month
    df["ESTIMATED_RENT"] = pd.to_numeric(df["PRICE"], errors="coerce") * 0.005

    with conn.cursor() as cur:
        inserted = 0
        for _, row in df.iterrows():
            try:
                cur.execute("SAVEPOINT row_save")
                price = pd.to_numeric(row.get("PRICE"), errors="coerce")
                sqft = pd.to_numeric(row.get("SQUARE FEET"), errors="coerce")
                lot = pd.to_numeric(row.get("LOT SIZE"), errors="coerce")
                yr = pd.to_numeric(row.get("YEAR BUILT"), errors="coerce")
                beds = pd.to_numeric(row.get("BEDS"), errors="coerce")
                baths = pd.to_numeric(row.get("BATHS"), errors="coerce")
                hoa = pd.to_numeric(row.get("HOA/MONTH"), errors="coerce")
                dom = pd.to_numeric(row.get("DAYS ON MARKET"), errors="coerce")
                lat = pd.to_numeric(row.get("LATITUDE"), errors="coerce")
                lng = pd.to_numeric(row.get("LONGITUDE"), errors="coerce")
                est_rent = price * 0.005 if pd.notna(price) else None

                cur.execute("""
                    INSERT INTO rentals (address, city, state, zip_code, house_value,
                        estimated_rent, bedrooms, bathrooms, square_feet, lot_size,
                        year_built, property_type, hoa_per_month, days_on_market,
                        redfin_url, latitude, longitude)
                    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
                    ON CONFLICT (address) DO UPDATE SET
                        house_value = EXCLUDED.house_value,
                        estimated_rent = EXCLUDED.estimated_rent,
                        bedrooms = EXCLUDED.bedrooms,
                        bathrooms = EXCLUDED.bathrooms,
                        square_feet = EXCLUDED.square_feet,
                        lot_size = EXCLUDED.lot_size,
                        year_built = EXCLUDED.year_built,
                        property_type = EXCLUDED.property_type,
                        hoa_per_month = EXCLUDED.hoa_per_month,
                        days_on_market = EXCLUDED.days_on_market,
                        redfin_url = EXCLUDED.redfin_url,
                        latitude = EXCLUDED.latitude,
                        longitude = EXCLUDED.longitude,
                        scraped_at = NOW()
                """, (
                    row.get("ADDRESS"),
                    row.get("CITY"),
                    row.get("STATE OR PROVINCE"),
                    str(row.get("ZIP OR POSTAL CODE", "")),
                    price if pd.notna(price) else None,
                    est_rent,
                    int(beds) if pd.notna(beds) else None,
                    float(baths) if pd.notna(baths) else None,
                    int(sqft) if pd.notna(sqft) else None,
                    int(lot) if pd.notna(lot) else None,
                    int(yr) if pd.notna(yr) else None,
                    row.get("PROPERTY TYPE"),
                    float(hoa) if pd.notna(hoa) else None,
                    int(dom) if pd.notna(dom) else None,
                    row.get("URL (SEE https://www.redfin.com/buy-a-home/comparative-market-analysis FOR INFO ON PRICING)"),
                    float(lat) if pd.notna(lat) else None,
                    float(lng) if pd.notna(lng) else None,
                ))
                inserted += 1
            except Exception as e:
                cur.execute("ROLLBACK TO SAVEPOINT row_save")
                print(f"  Skipping {row.get('ADDRESS')}: {e}")

    conn.commit()
    print(f"Inserted/updated {inserted} records.")


def main():
    if not DATABASE_URL:
        print("ERROR: Set DATABASE_URL environment variable.")
        print("  export DATABASE_URL='postgresql://user:pass@host:5432/dbname'")
        return

    if len(sys.argv) < 2:
        print("Usage: python scrape_redfin.py <redfin_csv_file>")
        return

    filepath = sys.argv[1]
    print(f"Connecting to database...")
    conn = psycopg2.connect(DATABASE_URL)
    create_table(conn)
    load_csv(filepath, conn)
    conn.close()
    print("\nDone! Your database is populated with Seattle homes.")


if __name__ == "__main__":
    main()