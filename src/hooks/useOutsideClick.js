import { useState, useEffect } from '@wordpress/element';
import { select, subscribe } from '@wordpress/data';

function useBlockSelection() {
    const [showSelection, setShowSelection] = useState(false);
    let previouslySelectedBlockId = null;

    useEffect(() => {
        const unsubscribe = subscribe(() => {
            const selectedBlockId = select('core/block-editor').getSelectedBlockClientId();

            if (selectedBlockId && previouslySelectedBlockId !== selectedBlockId) {
                setShowSelection(true);
            }

            if (!selectedBlockId && previouslySelectedBlockId) {
                setShowSelection(false);
            }

            previouslySelectedBlockId = selectedBlockId;
        });

        return () => unsubscribe();

    }, []);

    const handleLayoutClick = (e) => {
        e.stopPropagation();
        if (!showSelection) {
            setShowSelection(true);
        }
    };

    return { showSelection, handleLayoutClick };
};

export default useBlockSelection;
