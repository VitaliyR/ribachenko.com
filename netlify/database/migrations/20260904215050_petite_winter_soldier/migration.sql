CREATE TABLE "wishlist_items" (
	"id" serial PRIMARY KEY,
	"category" text NOT NULL,
	"category_position" integer DEFAULT 0 NOT NULL,
	"icon" text NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	"hidden" boolean DEFAULT false NOT NULL,
	"status" text,
	"position" integer DEFAULT 0 NOT NULL
);

ALTER TABLE "wishlist_items"
ADD CONSTRAINT "wishlist_items_status_check"
CHECK ("status" IS NULL OR "status" IN ('purchased', 'presented'));
