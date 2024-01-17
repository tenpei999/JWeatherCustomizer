import { useSelect, useDispatch } from '@wordpress/data';
import { Button } from '@wordpress/components';

const RemoveBlockButton = () => {
  // 現在選択されているブロックの ID を取得
  const selectedBlockClientId = useSelect((select) => {
    return select('core/block-editor').getSelectedBlockClientId();
  });

  // removeBlock 関数を useDispatch フックを通じて取得
  const { removeBlock } = useDispatch('core/block-editor');

  // ブロックを削除するハンドラ
  const handleRemoveBlock = () => {
    if (selectedBlockClientId) {
      removeBlock(selectedBlockClientId);
    }
  };

  return (
    <Button isSecondary onClick={handleRemoveBlock}>
      選択したブロックを削除
    </Button>
  );
};

export default RemoveBlockButton;
