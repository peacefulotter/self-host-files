
import { FiHome } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom';
import { Children } from 'react';

const Breadcrumb = ({ children }: any) => {
    return (
        <nav>
            <ol className="flex items-center space-x-4">{Children.toArray(children)}</ol>
        </nav>
    );
};

const BreadcrumbSeparator = () => (
    <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 text-gray-400 group-first:hidden mr-4" data-testid="flowbite-breadcrumb-separator" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
)
  
const BreadcrumbItem = ( { children, icon, href, hasPrev }: any) => {
    const Icon = icon;
    return (
        <li className='group flex items-center'>
            { hasPrev ? <BreadcrumbSeparator /> : null }
            <Link to={href} className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white ml-0">
                { icon ? <Icon className="mr-2" />  : null }
                { decodeURI( children ) }
            </Link>
        </li>
    );
};

const PathBreadcrumb = () => {
    const { pathname } = useLocation()
    const unveil = pathname.split('/').splice(1)
    const navigations = unveil.reduce( 
        (prev: string[], cur: string) =>
            [...prev, (prev.length > 0 ? prev[prev.length - 1] : '')  + '/' + cur + '/']
        , 
        [] as string[]
    )

    return (
        <Breadcrumb aria-label="Default breadcrumb example">
            <BreadcrumbItem href="/" icon={FiHome}>Home</BreadcrumbItem>
            { unveil.map( (path, i) => 
                <BreadcrumbItem key={`bc-${i}`} hasPrev={true} href={navigations[i]}>
                    {path}
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    )
}

export default PathBreadcrumb;