import {
  useState,
  ChangeEvent,
  useMemo,
  Dispatch,
  SetStateAction,
  useRef,
  MouseEvent,
} from 'react';
import { defaultManagers } from '../../constants/dropList';
import { Issue } from '../../types/Types';
import { VscClose } from 'react-icons/vsc';
import { TbUsers } from 'react-icons/tb';
import { useClickOutside } from '../../hooks/useClickOutside';
import e from 'express';

interface Props {
  setValue: Dispatch<SetStateAction<Issue>>;
  managers: string[];
}

const SearchManager = ({ setValue, managers }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState('');
  const [managerList, setManagerList] = useState<string[]>(managers);
  const [editMode, setEditMode] = useState(false);
  const domNode = useClickOutside(setEditMode);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredManagers = useMemo(
    () =>
      defaultManagers.filter((manager) => {
        return manager.name.toLowerCase().includes(filter.toLowerCase());
      }),
    [filter]
  );

  const handleClick = (manager: string) => {
    let newManagers: string[];
    if (managerList) {
      newManagers = [...managerList, manager];
    } else {
      newManagers = [manager];
    }

    setValue((prev) => ({
      ...prev,
      managers: newManagers,
    }));
    setManagerList(newManagers);
    setFilter('');
    setTimeout(() => {
      searchRef.current?.focus();
    }, 300);
  };

  const handleDelete = (manager: string) => {
    const newManagers = managerList.filter((m) => m !== manager);

    setValue((prev) => ({
      ...prev,
      managers: newManagers,
    }));

    searchRef.current?.blur();
    setEditMode(false);
    setManagerList(newManagers);
  };

  const handleEditMode = (e: MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    if (target.tagName !== 'svg') setEditMode(true);
    else setEditMode(false);
    searchRef.current?.focus();
  };

  return (
    <div className='flex py-1'>
      <div className='flex justify-start items-center w-[72px] gap-1 mr-2 text-sm whitespace-nowrap'>
        <TbUsers className='min-w-[18px] h-[18px] mr-1 opacity-50 ' size={18} />
        <p>담당자</p>
      </div>
      <div
        ref={domNode as React.RefObject<HTMLDivElement>}
        onClick={handleEditMode}
        className={`flex justify-start items-center w-[75%] py-1 cursor-pointer `}
      >
        <ul className='flex gap-1 text-sm whitespace-nowrap'>
          {managerList.map((name) => (
            <li key={name} className='flex justify-center items-center'>
              <p>{name}</p>
              <div onClick={() => handleDelete(name)}>
                <VscClose size={16} />
              </div>
            </li>
          ))}
        </ul>
        <input
          ref={searchRef}
          onChange={handleChange}
          onBlur={() => setFilter('')}
          value={filter}
          placeholder={!managerList ? '비어있음' : ''}
          className=' w-full rounded-lg border'
          type='text'
        />
      </div>
    </div>
  );
};

export default SearchManager;

{
  /* <div
ref={domNode as React.RefObject<HTMLDivElement>}
onClick={handleEditMode}
className={` 
} py-2 cursor-pointer flex w-full justify-start items-center z-10`}
>
<p className='mr-3 min-w-[45px]'>담당자</p>
<div
  className={`
${editMode && 'bg-sky-50 border'}
bg-[#f7f7f5] 
flex justify-start items-center h-10 px-2 relative w-full rounded-md `}
>
  {managerList.map((manager) => (
    <div
      key={manager}
      className={`${
        !editMode && 'mr-2'
      } w-auto flex justify-start items-center `}
    >
      <p className='w-[40px] text-sm'>{manager}</p>
      {editMode && (
        <button
          type='button'
          onClick={() => handleDeleteManager(manager)}
          className={`mr-1 hover:bg-gray-100 active:bg-gray-300 rounded`}
        >
          <VscClose size={16} />
        </button>
      )}
    </div>
  ))}

  <div className='flex peer-1 w-full  '>
    {managerList.length < 4 && (
      <input
        ref={searchRef}
        readOnly={editMode ? false : true}
        onChange={handleChange}
        onBlur={() => setFilter('')}
        value={filter}
        placeholder={!managerList ? '비어있음' : ''}
        className='peer w-full bg-[#f7f7f5] flex justify-center items-center text-sm cursor-pointer '
        type='text'
      />
    )}
    {
      <ul
        className={`text-sm cursor-pointer absolute left-0 top-[38px] w-full z-20 rounded-b-lg bg-white border `}
      >
        {editMode && !filter && managerList.length < 4 && (
          <li className='py-2'>결과없음</li>
        )}
        {filter &&
          filteredManagers
            .filter((m) => !managerList.includes(m.name))
            .map((manager) => {
              const { name } = manager;
              return (
                <li
                  key={name}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleClick(name)}
                  className=' py-2 list-none hover:bg-gray-100'
                >
                  {name}
                </li>
              );
            })}
      </ul>
    }
  </div>
</div>
</div> */
}
