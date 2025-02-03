const fs = require('fs');

// Function to patch the file in memory with multiple patches
function patchFileInMemory(filePath, patches, outputFilePath) {
    try {
        // Read the entire file into a buffer
        const buffer = fs.readFileSync(filePath);

        // Apply each patch
        for (const patch of patches) {
            const offset = patch.offset;
            const newValue = patch.newValue;

            // Check if the offset is within the file size
            if (offset + newValue.length > buffer.length) {
                console.error(`Offset 0x${offset.toString(16)} is out of bounds!`);
                continue;
            }

            // Patch the value at the specified offset
            for (let i = 0; i < newValue.length; i++) {
                buffer[offset + i] = newValue[i];
            }
        }

        // Save the modified file
        fs.writeFileSync(outputFilePath, buffer);
        console.log(`File patched successfully! Saved to: ${outputFilePath}`);

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

// Main execution
const filePath = '/storage/emulated/0/libil2cpp.so';
const outputFilePath = '/storage/emulated/0/libil2cpp_patched.so';

// Define the patches as an array of {offset, newValue} objects
const patches = [
    { // GetFinalCoins offset 0x796AF8
        offset: 0x796AF8,
        newValue: [
            0xFF, 0x09, 0x0C, 0xE3, 0x00, 0x10, 0xA0, 0xE3,
            0x9A, 0x0B, 0x43, 0xE3, 0x1E, 0xFF, 0x2F, 0xE1
        ]
    },
    { // long GetFinalDiamonds offset 0x796B6C
        offset: 0x796B6C,
        newValue: [
            0xFF, 0x09, 0x0C, 0xE3, 0x00, 0x10, 0xA0, 0xE3,
            0x9A, 0x0B, 0x43, 0xE3, 0x1E, 0xFF, 0x2F, 0xE1
        ]
    },
    { // long GetFinalOnlineChips Offset: 0x796C68
        offset: 0x796C68,
        newValue: [
            0xFF, 0x09, 0x0C, 0xE3, 0x00, 0x10, 0xA0, 0xE3,
            0x9A, 0x0B, 0x43, 0xE3, 0x1E, 0xFF, 0x2F, 0xE1
        ]
    },
    { // long GetFinalEnergy Offset: 0x796CB4
        offset: 0x796CB4,
        newValue: [
            0xFF, 0x09, 0x0C, 0xE3, 0x00, 0x10, 0xA0, 0xE3,
            0x9A, 0x0B, 0x43, 0xE3, 0x1E, 0xFF, 0x2F, 0xE1
        ]
    },
    { // long GetFinalTokens Offset: 0x796C88
        offset: 0x796C88,
        newValue: [
            0xFF, 0x09, 0x0C, 0xE3, 0x00, 0x10, 0xA0, 0xE3,
            0x9A, 0x0B, 0x43, 0xE3, 0x1E, 0xFF, 0x2F, 0xE1
        ]
    },
    { // long GetTotalCafeIAPCount Offset: 0x796CD0
        offset: 0x796CD0,
        newValue: [
            0xFF, 0x09, 0x0C, 0xE3, 0x00, 0x10, 0xA0, 0xE3,
            0x9A, 0x0B, 0x43, 0xE3, 0x1E, 0xFF, 0x2F, 0xE1
        ]
    },
    { // bool IsNoAdPurchased offset 0x7F4F90
        offset: 0x7F4F90,
        newValue: [0x01, 0x00, 0xA0, 0xE3, 0x1E, 0xFF, 0x2F, 0xE1]
    }
];

// Execute the patching
patchFileInMemory(filePath, patches, outputFilePath);
