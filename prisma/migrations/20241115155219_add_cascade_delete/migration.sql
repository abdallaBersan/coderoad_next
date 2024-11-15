-- DropForeignKey
ALTER TABLE "Roadmap" DROP CONSTRAINT "Roadmap_authorId_fkey";

-- AddForeignKey
ALTER TABLE "Roadmap" ADD CONSTRAINT "Roadmap_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
