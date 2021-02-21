import TableContext from './TableContext';
const launchFilters=[
    
]
class TableProvider extends Component {
    state = {
        data: [],
        loading:true,
        pageNo:1,
        perPage:12,
        launchFilter:0,
    };

    setPage=(num)=>{
this.setState({
pageNo:num
})
    }

    
    render() {
        return (
            <TableContext.Provider
                value={}
            >
                {this.props.children}
            </TableContext.Provider>
        );
    }
}
export default TableProvider;