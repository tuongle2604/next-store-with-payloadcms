import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_customers_shippings_country" AS ENUM('ad', 'al', 'at', 'ba', 'be', 'bg', 'by', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mc', 'md', 'me', 'mk', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'rs', 'ru', 'se', 'si', 'sk', 'sm', 'ua', 'va', 'vi');
  CREATE TYPE "public"."enum_customers_role" AS ENUM('customer');
  ALTER TABLE "customers_shippings" ALTER COLUMN "country" SET DATA TYPE "public"."enum_customers_shippings_country" USING "country"::"public"."enum_customers_shippings_country";
  ALTER TABLE "customers" ADD COLUMN "role" "enum_customers_role" DEFAULT 'customer' NOT NULL;
  ALTER TABLE "customers" ADD COLUMN "phone" varchar;
  ALTER TABLE "customers" ADD COLUMN "bio" varchar;
  ALTER TABLE "customers" DROP COLUMN "birth_date";
  ALTER TABLE "customers" DROP COLUMN "last_buyer_type";
  DROP TYPE "public"."enum_customers_last_buyer_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_customers_last_buyer_type" AS ENUM('individual', 'company');
  ALTER TABLE "customers_shippings" ALTER COLUMN "country" SET DATA TYPE varchar;
  ALTER TABLE "customers" ADD COLUMN "birth_date" timestamp(3) with time zone;
  ALTER TABLE "customers" ADD COLUMN "last_buyer_type" "enum_customers_last_buyer_type";
  ALTER TABLE "customers" DROP COLUMN "role";
  ALTER TABLE "customers" DROP COLUMN "phone";
  ALTER TABLE "customers" DROP COLUMN "bio";
  DROP TYPE "public"."enum_customers_shippings_country";
  DROP TYPE "public"."enum_customers_role";`)
}
