import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Pagination({postsPerPage , totalPosts}) {
  const pageNumbers = []

  for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage);i++){
    pageNumbers.push(i);
  }
    return (
    <div className="join">
  
    {
        pageNumbers.map((page)=>(
            <li key={page} className='btn bg-slate-100'>
                <Link to='.'>
                    {page}
                </Link>
            </li>

            )
        )
    }
    
</div>
  )
}
