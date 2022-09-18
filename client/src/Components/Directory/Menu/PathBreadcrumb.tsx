
import { FiHome } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom';
import React, { Children } from 'react';

const Breadcrumb = ({ children }: any) => {
    return (
        <nav>
            <ol className="flex items-center space-x-2">{Children.toArray(children)}</ol>
        </nav>
    );
};

const BreadcrumbSeparator = () => (
    <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-gray-500" data-testid="flowbite-breadcrumb-separator" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
)
  
const BreadcrumbItem = ( { children, icon, href, hasPrev }: any) => {
    const Icon = icon;
    return (
        <li className='group'>
            <Link to={href} className="btn">
                { icon ? <Icon className="btn-icon" /> : null }
                <p className="btn-text">{ decodeURI( children ) }</p>
            </Link>
        </li>
    );
};

const PathBreadcrumb = () => {
    const { pathname } = useLocation()
    const unveil = pathname.split('/').filter((e) => e !== '')
    const navigations = unveil.reduce( 
        (prev: string[], cur: string) =>
            [...prev, (prev.length > 0 ? prev[prev.length - 1] : '')  + '/' + cur + '/']
        , 
        [] as string[]
    )

    return (
        <Breadcrumb aria-label="Default breadcrumb example">
            <BreadcrumbItem href="/" icon={FiHome}>Home</BreadcrumbItem>
            <BreadcrumbSeparator />
            { unveil.map( (path, i) => 
                <React.Fragment key={`bc-${i}`}>
                    <BreadcrumbItem  hasPrev={true} href={navigations[i]}>
                        {path}
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </React.Fragment> 
            ) }
        </Breadcrumb>
    )
}

export default PathBreadcrumb;