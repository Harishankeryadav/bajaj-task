import React from 'react';

const ResponseDisplay = ({ response, selectedCategories }) => {
    if (!response) return <p>No response yet.</p>; // Handle null response

    // Destructure response with defaults
    const { highest_lowercase_alphabet = [], numbers = [], alphabets = [] } = response;

    return (
        <div>
            {selectedCategories.includes('highest_lowercase_alphabet') && (
                <div>
                    <h3>Highest Lowercase Alphabet</h3>
                    <p>
                        {highest_lowercase_alphabet.length > 0
                            ? highest_lowercase_alphabet.join(', ')
                            : 'No lowercase alphabet found'}
                    </p>
                </div>
            )}
            {selectedCategories.includes('numbers') && (
                <div>
                    <h3>Numbers</h3>
                    <p>{numbers.length > 0 ? numbers.join(', ') : 'No numbers found'}</p>
                </div>
            )}
            {selectedCategories.includes('alphabets') && (
                <div>
                    <h3>Alphabets</h3>
                    <p>{alphabets.length > 0 ? alphabets.join(', ') : 'No alphabets found'}</p>
                </div>
            )}
        </div>
    );
};

export default ResponseDisplay;
