const fs = require('fs');
const path = require('path');

const getFileDirName = async (dir, fileName) => {
    try {
        const files = await fs.promises.readdir(dir, { withFileTypes: true });
        for (const file of files) {
            const filePath = path.join(dir, file.name);
            if (file.isDirectory()) {
                const result = await getFileDirName(filePath, fileName);
                if (result) return result;
            } else if (file.name === fileName) {
                return path.dirname(filePath);
            }
        }
        return null;
    } catch (error) {
        throw new Error(`Error reading directory: ${error.message}`);
    }
};

module.exports = getFileDirName;
