import { useState, useEffect } from '@wordpress/element';
import { select, subscribe } from '@wordpress/data';

/**
 * It provides a state and a function to manage the visibility of JWeatherCustomizer UI elements
 * based on whether a block is selected. It also offers a method to handle click events
 * on a layout component to toggle this visibility state.
 *
 * @returns {Object} - An object containing the visibility state and a click event handler function.
 */
function useBlockSelection() {
    const [showSelection, setShowSelection] = useState(false);
    let previouslySelectedBlockId = null;

    useEffect(() => {
        // Subscribe to the block editor's selection changes.
        const unsubscribe = subscribe(() => {

            // Get the currently selected block ID.
            const selectedBlockId = select('core/block-editor').getSelectedBlockClientId();

            // If there is a new block selected and it's different from the previous one, show the selection.
            if (selectedBlockId && previouslySelectedBlockId !== selectedBlockId) {
                setShowSelection(true);
            }

            // If no block is selected and there was a previously selected block, hide the selection.

            if (!selectedBlockId && previouslySelectedBlockId) {
                setShowSelection(false);
            }

            // Update the previously selected block ID for the next check.
            previouslySelectedBlockId = selectedBlockId;
        });

        return () => unsubscribe();

    }, []); // Empty dependency array means this effect runs only on mount and unmount.

    /**
     * Handles click events on the layout component. If the selection is not currently shown,
     * it sets the state to show the selection. This function can be attached to any clickable
     * layout component to toggle its associated UI elements based on selection visibility.
     *
     * @param {Event} e - The click event object.
     */
    const handleLayoutClick = (e) => {
        e.stopPropagation();
        if (!showSelection) {
            setShowSelection(true);
        }
    };

    return { showSelection, handleLayoutClick };
};

export default useBlockSelection;
