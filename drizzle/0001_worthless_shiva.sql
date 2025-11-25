ALTER TABLE "akti" ADD COLUMN "version" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "rating" ADD COLUMN "akti_version" integer NOT NULL;