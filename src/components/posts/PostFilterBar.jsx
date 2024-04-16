export const PostFilterBar = ({setSearchTerm}) => {
    return (<div className="filter-bar">
        <input
        onChange={(event) => {setSearchTerm(event.target.value)}}
        type="text"
        placeholder="Search Post Titles"
        className="post-search"/>
         </div>)}