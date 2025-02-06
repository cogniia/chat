import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface IBreadcrumb {
    tree: Tree[];
    currentPage: CurrentPage;
}

interface Tree {
    name: string;
    path: string
}

interface CurrentPage {
    name: string;
}

export function BreadcrumbComponent({ currentPage, tree }: IBreadcrumb) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {
                    tree.map((page, index) => {
                        return (
                            <div key={index} className="flex items-center">
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={page.path} className="text-grey-800 text-sm" >{page.name}</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="text-grey-800" />
                            </div>
                        )
                    })
                }
                <BreadcrumbItem>
                    <BreadcrumbPage className="text-purple-700 text-sm font-medium">{currentPage.name}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
