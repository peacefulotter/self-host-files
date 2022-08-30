
import { HiHome } from 'react-icons/hi'
import { Breadcrumb } from "flowbite-react";
import { useLocation } from 'react-router-dom';

const Path = () => {
    const { pathname } = useLocation()
    const unveil = pathname.split('/').slice(1)
    const navigations = unveil.reduce( 
        (prev: string[], cur: string) =>
            [...prev, (prev.length > 0 ? prev[prev.length - 1] : '')  + '/' + cur]
        , 
        [] as string[]
    )
    console.log(pathname, unveil, navigations);
    
    return (
        <Breadcrumb aria-label="Default breadcrumb example">
            <Breadcrumb.Item href="/" icon={HiHome}>Home</Breadcrumb.Item>
            { unveil.map( (path, i) => 
                <Breadcrumb.Item key={`bc-${i}`} href={navigations[i]}>
                    {path}
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    )
}

export default Path;