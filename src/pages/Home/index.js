import React, {useState, useReducer} from 'react'
import store from '@/store'
import reducers from '@/store/reducers'


const Home = () => {
  const [count, setCount] = useState(0)
  const [demo] = useState(store.getState())
  const [state, dispatch] = useReducer(reducers, demo);

  return (
    <>
      <div>count:{count}</div>
      <div>num: {state.num}</div>
      <button onClick={() => {setCount(count+1)}}>count +</button>
      <button onClick={() => {setCount(count-1)}}>count -</button>
      <button onClick={() => {dispatch({type:'ADD'})}}>num +</button>
      <button onClick={() => {dispatch({type: 'REDUCE'})}}>num -</button>
    </>
  )
}





export default Home