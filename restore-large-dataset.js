const fs = require('fs');
const path = require('path');

console.log('🔄 Restoring large phrase dataset...');

const sourcePath = path.join(
  __dirname,
  'src',
  'data',
  'phrases-large.json.backup',
);
const targetPath = path.join(__dirname, 'src', 'data', 'phrases-large.json');

try {
  // Check if backup file exists
  if (!fs.existsSync(sourcePath)) {
    console.error('❌ Backup file not found:', sourcePath);
    process.exit(1);
  }

  // Copy the backup file to the expected location
  fs.copyFileSync(sourcePath, targetPath);

  // Verify the copy was successful
  const sourceStats = fs.statSync(sourcePath);
  const targetStats = fs.statSync(targetPath);

  console.log('✅ Successfully restored large dataset!');
  console.log(
    `📁 File size: ${(targetStats.size / 1024 / 1024).toFixed(2)} MB`,
  );
  console.log(`📊 Expected phrases: 50,000+`);
  console.log(
    `🎯 The app will now use the large dataset instead of 48 phrases`,
  );

  // Clean up the script
  fs.unlinkSync(__filename);
  console.log('🧹 Cleanup complete');
} catch (error) {
  console.error('❌ Error restoring dataset:', error.message);
  process.exit(1);
}
