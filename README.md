# Manamasjid

A centralized app for Masjid timings

## Admin user

user_table

1. id
2. email
3. username
4. password
5. isAdmin
6. created_at
7. createdBy
8. modifiedBy
9. updated_at

## Masjid

masjids

1. id
2. name
3. address
4. city
5. state
6. country
7. created_at
8. owner_name
9. phone
10. email
11. profile_id

## prayer Times

prayer_times

1. id
2. masjid_id
3. date
4. fajr
5. zohar
6. asr
7. maghrib
8. isha
9. maghrib_waqf
10. created_at
11. modified_at
12. created_by

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE masjids (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    phone TEXT NOT NULL CHECK (phone ~ '^[0-9+\-() ]+$'), -- Basic validation
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'), -- Email validation
    created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE prayer_times (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    masjid_id UUID REFERENCES masjids(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    fajr TIME NOT NULL,
    zohar TIME NOT NULL,
    asr TIME NOT NULL,
    maghrib TIME NOT NULL,
    isha TIME NOT NULL,
    maghrib_waqf TIME,
    created_at TIMESTAMP DEFAULT now(),
    created_by TEXT NOT NULL
);
```
