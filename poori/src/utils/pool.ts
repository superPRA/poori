import { Pool } from "pg"

const pool = new Pool({
    connectionString: "postgresql://root:e2N7kfepr8ltB4Cbe2O6OT2q@luca.iran.liara.ir:30234/postgres"
})

export default pool