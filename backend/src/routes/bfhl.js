
// const express = require('express');
// const router = express.Router();
// const fileType = require('file-type');
 
// function decodeBase64(base64Str) {
//     try {
//         return Buffer.from(base64Str, 'base64');
//     } catch (error) {
//         return null;
//     }
// }
 
// router.post('/', async (req, res) => {
//     try {
//         const { data, file_b64 } = req.body;
 
//         const numbers = data.filter(item => !isNaN(item));
//         const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
 
//         const lowercaseAlphabets = alphabets.filter(letter => letter === letter.toLowerCase());
//         const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];
 
//         let fileValid = false;
//         let fileMimeType = null;
//         let fileSizeKb = 0;

//         if (file_b64) {
//             const decodedFile = decodeBase64(file_b64);
//             if (decodedFile) {
//                 fileValid = true;
//                 const fileInfo = await fileType.fromBuffer(decodedFile);
//                 if (fileInfo) {
//                     fileMimeType = fileInfo.mime;
//                 }
//                 fileSizeKb = (decodedFile.length / 1024).toFixed(2); 
//             }
//         }
 
//         const response = {
//             is_success: true,
//             user_id: "hari_shanker_yadav-07092002",
//             email: "ha3154@srmist.edu.in",
//             roll_number: "RA2111003030105",
//             numbers,
//             alphabets,
//             highest_lowercase_alphabet: highestLowercaseAlphabet,
//             file_valid: fileValid,
//             file_mime_type: fileMimeType,
//             file_size_kb: fileSizeKb
//         };

//         res.status(200).json(response);

//     } catch (error) {
//         res.status(400).json({ is_success: false, error: error.message });
//     }
// });
 
// router.get('/', (req, res) => {
//     res.status(200).json({
//         operation_code: 1
//     });
// });

// module.exports = router;  


const express = require('express');
const router = express.Router();
const fileType = require('file-type');

function decodeBase64(base64Str) {
    try {
        return Buffer.from(base64Str, 'base64');
    } catch (error) {
        return null;
    }
}

router.post('/', async (req, res) => {
    try {
        const { data, file_b64 } = req.body;

        // Extract numbers and alphabets
        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

        // Get highest lowercase alphabet
        const lowercaseAlphabets = alphabets.filter(letter => letter === letter.toLowerCase());
        // const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];
     const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];


        // File handling
        let fileValid = false;
        let fileMimeType = null;
        let fileSizeKb = 0;

        if (file_b64) {
            const decodedFile = decodeBase64(file_b64);
            if (decodedFile) {
                fileValid = true;
                const fileInfo = await fileType.fromBuffer(decodedFile);
                if (fileInfo) {
                    fileMimeType = fileInfo.mime;
                }
                fileSizeKb = (decodedFile.length / 1024).toFixed(2); 
            }
        }

        // Prepare response
        const response = {
            is_success: true,
            user_id: "hari_shanker_yadav-07092002",
            email: "ha3154@srmist.edu.in",
            roll_number: "RA2111003030105",
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet,
            file_valid: fileValid,
            file_mime_type: fileMimeType,
            file_size_kb: fileSizeKb
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ is_success: false, error: error.message });
    }
});

router.get('/', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

module.exports = router;
