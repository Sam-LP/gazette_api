import minimist from "minimist"

// Parsing des arguments
const args = minimist(process.argv.slice(2))

// Détermination du fichier contenant les variables d'environnement (dev / prod)
const env = ["dev", "prod"].includes(args['ENV']) ? args['ENV'] : "dev"

export default env