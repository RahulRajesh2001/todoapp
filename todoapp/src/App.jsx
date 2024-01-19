import React, { useEffect, useState } from 'react'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import CheckIcon from '@mui/icons-material/Check'

const App = () => {
  const [alltodos, setAlltodos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [completed, setCompleted] = useState([])
  const [isCompleted, setIscompleted] = useState('0')

  function titleChange(e) {
    setTitle(e.target.value)
  }
  function descriptionChange(e) {
    setDescription(e.target.value)
  }

  const handleAllTodo = () => {

    if(title.trim()=='' && description.trim()==''){
      return 
    }

      let newTodoItem = {
        title: title,
        description: description,
      }
    

    let updatedTodoArr = [...alltodos]
    updatedTodoArr.push(newTodoItem)
    setAlltodos(updatedTodoArr)
    localStorage.setItem('Todo', JSON.stringify(updatedTodoArr))

    setTitle('')
    setDescription('')
  }

  const handleDelete = (index) => {
    let reducedTodo = [...alltodos]
    reducedTodo.splice(index, 1)
    setAlltodos(reducedTodo)
    localStorage.setItem('Todo', JSON.stringify(reducedTodo))
  }

  const handleCheck = (index) => {
    let filteredItem = {
      ...alltodos[index],
    }
    let completedTodo = [...completed]
    completedTodo.push(filteredItem)
    localStorage.setItem('completed', JSON.stringify(completedTodo))
    setCompleted(completedTodo)

    let reducedTodocompleted = [...alltodos]
    reducedTodocompleted.splice(index, 1)
    setAlltodos(reducedTodocompleted)
    localStorage.setItem('Todo', JSON.stringify(reducedTodocompleted))
  }

  function handlerisCompleted() {
    setIscompleted('1')
  }

  function handletodos() {
    setIscompleted('0')
  }

  const handleCompletedDelete = (index) => {
    let removecompleted = [...completed]
    removecompleted.splice(index, 1)
    setCompleted(removecompleted)
    localStorage.setItem('completed', JSON.stringify(removecompleted))
  }

  useEffect(() => {
    const todo = JSON.parse(localStorage.getItem('Todo'))
    setAlltodos(todo || [])
    const completedtodo = JSON.parse(localStorage.getItem('completed'))
    setCompleted(completedtodo || [])
  }, [])

  return (
    <>
      <div className='bg-[#1A1110] flex flex-col justify-center items-center gap-[50px] w-[100%] h-screen '>
        <div className='font-serif font-semibold text-[30px] text-[#FFFF]'>
          ToDos
        </div>

        <div className='bg-[#343434] sm:w-[70%] vvsm:w-[70%] overflow-y-auto sm:h-[80%] vvsm:h-[70%] rounded '>
          <div className=' flex justify-center items-center   w-[100%] sm:h-[50%] vvsm:h-[70%]  border-b-[1px] sm:gap-0 sm:flex-row  vvsm:flex-col vvsm:gap-[10px]'>
            <div className=' flex flex-col justify-center items-center sm:gap-[20px] sm:w-[45%] vvsm:w-[80%] sm:h-[100%] vvsm:h-[28%] '>
              <div className='font-serif font-normal text-[20px] text-[#FFFF]'>
                Title
              </div>
              <input
                placeholder='Write your Titile here...'
                value={title}
                className='sm:w-[90%] sm:h-[40px] vvsm:w-[100%] vvsm:h-[40px] rounded'
                onChange={titleChange}
              ></input>
            </div>

            <div className=' flex flex-col justify-center items-center sm:gap-[20px] sm:w-[45%] vvsm:w-[80%] sm:h-[100%] vvsm:h-[28%]'>
              <div className='font-serif font-normal text-[20px] text-[#FFFF]'>
                Description
              </div>
              <input
                placeholder='Note your description here...'
                value={description}
                className='sm:w-[90%] sm:h-[40px] vvsm:w-[100%] vvsm:h-[40px] rounded'
                onChange={descriptionChange}
              ></input>
            </div>
            <div className='  flex justify-center items-center sm:w-[10%] sm:h-[100%] vvsm:w-[20%] vvsm:h-[10%]  '>
              <button
                className='bg-green-300 rounded sm:mt-[50px] sm:w-[50px] h-[40px] font-mono vvsm:mt-[30px] vvsm:w-[40px] vvsm:h-[40px]'
                onClick={handleAllTodo}
              >
                Add
              </button>
            </div>
          </div>

          {/* bottom buttons */}

          <div className=' flex flex-col mt-5 ml-5 w-[90%] sm:h-[40%] vvsm:h-[25%]'>
            <div className=' flex gap-[10px] h-[40%]'>
              <button
                onClick={handletodos}
                className='bg-[#252525]  sm:w-[100px] sm:h-[40px] vvsm:w-[50px] vvsm:h-[40px] text-[#ffff] font-mono font-semibold rounded-full hover:bg-green-300'
              >
                ToDo
              </button>
              <button
                onClick={handlerisCompleted}
                className='bg-[#252525] sm:w-[100px] sm:h-[40px] vvsm:w-[100px] vvsm:h-[40px]  text-[#ffff] font-mono font-semibold rounded-full hover:bg-green-300'
              >
                Completed
              </button>
            </div>

            {/* todo item */}

            {isCompleted === '0' &&
              alltodos.map((element, index) => (
                <div className='bg-[#252525] flex justify-center items-center w-[90%] sm:h-[100px] vvsm:h-[60px] sm:mt-[10px] vvsm:mt-[20px] rounded'>
                  <div className='w-[70%]  h-full flex flex-col '>
                    <div className='w-[100%] h-[50%] font-serif font-semibold sm:text-[22px] ml-[30px] text-[#ffff]'>
                      {element.title}
                    </div>
                    <div className='w-[100%] h-[50%] ml-[20px] text-[15px] text-[#ffff]'>
                      {element.description}
                    </div>
                  </div>
                  <div className=' flex justify-center items-center w-[15%] h-full '>
                    <button
                      style={{ color: 'white' }}
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteSweepIcon />
                    </button>
                  </div>
                  <div className=' flex justify-center items-center w-[15%] h-full '>
                    <button
                      style={{ color: 'white' }}
                      onClick={() => handleCheck(index)}
                    >
                      <CheckIcon />
                    </button>
                  </div>
                </div>
              ))}

            {isCompleted === '1' &&  
            
              completed.map((single, index) => (
                <div className='bg-[#252525] flex justify-center items-center w-[90%] sm:h-[100px] vvsm:h-[60px] sm:mt-[10px] vvsm:mt-[20px] rounded'>
                  <div className='w-[70%]  h-full flex flex-col '>
                    <div className='w-[100%] h-[50%] font-serif font-semibold sm:text-[22px] ml-[30px] text-[#ffff]'>
                      {single.title}
                    </div>
                    <div className='w-[100%] h-[50%] ml-[20px] text-[15px] text-[#ffff]'>
                      {single.description}
                    </div>
                  </div>
                  <div className=' flex justify-center items-center w-[15%] h-full '>
                    <button
                      style={{ color: 'white' }}
                      onClick={() => handleCompletedDelete(index)}
                    >
                      <DeleteSweepIcon />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
