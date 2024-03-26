export function PublicLink({url, title}){
    return(
        <div>
            <a target={"_blank"} href={url}>{title}</a>
        </div>
    )
}