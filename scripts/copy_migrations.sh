echo ""
echo "Copying Migrations"
echo ""

echo " -> Step 1/2: Removing old migrations."
echo ""
 rm ../ec2-migrator/migrations/*.js
echo ""
echo " -> Remove completed."
echo ""

echo " -> Step 2/2: Copying Migrations."
echo ""
 cp -rf ./.migrations/*.js ../ec2-migrator/migrations
echo ""
echo " -> Copy completed."
echo ""