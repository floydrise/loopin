import {reset, seed} from "drizzle-seed";
import {db} from "./index";
import {eventsTable} from "./schema";

const seedEventsTable = async () => {
    try {
        await seed(db, {eventsTable});
        console.log("Successfully seeded DB!");
        return;
    } catch (e) {
        console.log(e, "Error seeding");
        return;
    }
}

const resetEventsTable = async () => {
    try {
        await db.delete(eventsTable);
        console.log("Successfully reset table");
    } catch (e) {
        console.error(e, "Error during resetting occurred");
    }
}

resetEventsTable();