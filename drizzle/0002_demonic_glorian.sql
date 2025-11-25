ALTER TABLE "rating" DROP CONSTRAINT "rating_akti_id_user_id_pk";--> statement-breakpoint
ALTER TABLE "rating" ADD COLUMN "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;