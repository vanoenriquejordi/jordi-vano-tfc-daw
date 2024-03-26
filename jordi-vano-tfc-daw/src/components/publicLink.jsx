import style from "./publicLinkView.module.css"

export function PublicLink({url, title}){
    return(
            <a target={"_blank"} href={url} className={style.publicLinkContainer}>
                <div>{title}</div>
            </a>
    )
}