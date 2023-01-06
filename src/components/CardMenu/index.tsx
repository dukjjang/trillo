import { cardOptions } from '../../constants/cardOptions';
import { GoTrashcan, GoPencil } from 'react-icons/go';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  optionsRef: any;
  handleDelete: (boardId: number, cardId: number) => void;
  setIsOpenDetail: Dispatch<SetStateAction<boolean>>;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  boardId: number;
  cardId: number;
}

const CardMenu = ({
  optionsRef,
  handleDelete,
  boardId,
  cardId,
  setIsOpenDetail,
  setIsMenuOpen,
}: Props) => {
  const handleClick = (name: string) => {
    if (name === '삭제') handleDelete(boardId, cardId);
    if (name === '편집') {
      setIsOpenDetail(true);
    }

    setIsMenuOpen(false);
  };
  return (
    <ul
      ref={optionsRef}
      className=' w-28 py-2 px-1 border bg-white rounded-lg -mt-2 overflow-hidden shadow-xl z-10  absolute '
    >
      {cardOptions.map((option) => {
        const { name } = option;
        return (
          <li
            className='flex justify-start rounded-md items-center py-2  px-2 gap-2 hover:bg-gray-200 text-sm '
            key={option.id}
            onClick={() => {
              handleClick(name);
            }}
          >
            {name === '삭제' && <GoTrashcan size={17} />}
            {name === '편집' && <GoPencil size={17} />}
            <p>{name}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default CardMenu;
