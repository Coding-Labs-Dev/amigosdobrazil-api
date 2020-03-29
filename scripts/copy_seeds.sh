echo ""
echo "Copying Seeds"
echo ""

echo " -> Step 1/2: Removing old Seeds."
echo ""
 rm ../ec2-migrator/seeders/*.js
echo ""
echo " -> Remove completed."
echo ""

echo " -> Step 2/2: Copying new Seeds."
echo ""
 cp -rf ./seeders/*.js ../ec2-migrator/seeders
echo ""
echo " -> Copy completed."
echo ""