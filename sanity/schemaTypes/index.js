import category from "./category";
import page from "./page";
import service from "./service";
import user from "./user";
import blog from "./blog"; // <-- you added this

export const schema = [category, page, service, user, blog]; // ✅ Not schemaTypes
