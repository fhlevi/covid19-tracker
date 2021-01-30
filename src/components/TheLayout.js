import {
    TheContent,
    TheHeader,
    TheFooter
} from './index.js';

const TheLayout = () => {
    return (
        <div>
            <TheHeader />
            <div>
                <TheContent />
            </div>
            <TheFooter />
        </div>
    )
}

export default TheLayout;
