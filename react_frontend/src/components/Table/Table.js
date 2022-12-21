import './Table.css';
function Header(props) {
    console.log('Table props', props)
    const { data, columns, handleDelete, handleAccept, updateUrl } = props
    return (
        <table>
            <thead>
            <tr>
                {columns &&
                columns.map(entry =>
                    <td>{entry.charAt(0).toUpperCase() + entry.slice(1).replace(/_/, ' ')}</td>
                )}
                {
                    (handleDelete || handleAccept || updateUrl) &&
                    <td>Actions</td>
                }
            </tr>
            </thead>
            <tbody>

            {data && data.map(entry =>
                <tr>
                    {columns &&
                    columns.map(column =>
                        <td>{entry[column]}</td>
                    )}
                    {
                        (handleAccept || handleDelete || updateUrl) &&
                        (
                            <td>
                                {
                                    updateUrl &&
                                    (
                                        <>
                                            <a href={`/users/${entry.id}`}>Update</a>
                                            &nbsp;
                                        </>
                                    )

                                }
                                {
                                    handleDelete &&
                                    <a href="#" onClick={() => handleDelete(entry.id)}>Delete</a>
                                }
                                {
                                    handleAccept && entry.status.toLowerCase() === 'created' &&
                                    (
                                        <>
                                            <a href="#" onClick={() => handleAccept(entry.id, true)}>Accept</a> &nbsp;
                                            <a href="#" onClick={() => handleAccept(entry.id, false)}>Reject</a>
                                        </>
                                    )
                                }
                            </td>
                        )
                    }

                </tr>
            )}
            </tbody>
        </table>
    );
}
export default Header;
