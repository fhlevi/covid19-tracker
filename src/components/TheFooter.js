import React from 'react';

const TheFooter = () => {
    return (
        <>
            <footer className="covid-tracker-footer">
                <p>&copy; Covid Tracker { new Date().getFullYear() }</p>
            </footer>
        </>
    )
}

export default TheFooter;