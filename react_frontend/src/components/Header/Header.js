import './Header.css';
function Header(props) {
   console.log('Header props', props)
    const navigations = [
        ['/orders', 'Orders']
    ]
    if(props.role && props.role !== 'employee') {
        navigations.push(['/users', 'Users'])
    }
    if(props.role && props.role === 'superadmin') {
        navigations.push(['/logs', 'Logs'])
    }

    return (
        <ul>
            {navigations.map(item => {
                return (
                    <li key={item[0]}>
                        <a
                            className={((!props.currentPage || props.currentPage === '/') && item[0] === '/orders') || props.currentPage === item[0] ? "active" : ""}
                            href={item[0]}>{item[1]}
                        </a>
                    </li>
                )
            })}
            <li key="logout" className={"right"}><a onClick={props.logout} href={"/"}>Log out</a></li>
        </ul>
);
}
export default Header;
