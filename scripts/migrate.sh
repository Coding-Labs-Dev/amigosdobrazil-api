# Read arguments passed to the script.
if [ -z "$1" ]; then
 ENVIRONMENT='development'
else
 ENVIRONMENT="$1"
fi

echo ""
echo "Migrating for environment: $ENVIRONMENT"
echo ""

echo " -> Step 1/4: Removing old migrations."
echo ""
 rm ./.migrations/*.js
echo ""
echo " -> Compilation completed."
echo ""

echo " -> Step 2/4: Compiling migration scripts."
echo ""
 yarn tsc -p ./src/database/migrations/tsconfig.json
echo ""
echo " -> Compilation completed."
echo ""

echo ""
echo " -> Step 3/4: Copying resources required for migration."
cp -rf ./src/database/dump ./migrations/database/
echo " -> Copying resources completed."
echo ""

echo ""
echo " -> Step 4/4: Starting migration."
echo ""
yarn cross-env NODE_ENV=$ENVIRONMENT sequelize db:migrate
echo ""
echo " -> Migration completed."
echo ""