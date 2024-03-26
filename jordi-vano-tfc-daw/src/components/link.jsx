import { useEffect, useRef, useState } from "react";
import { deleteLink } from "../firebase/firebase";
import style from "./link.module.css";

export default function Link({
  docId,
  title,
  url,
  onDelete,
  onUpdate,
}) {
  const [currentTitle, setTitle] = useState(title);
  const [currentUrl, setUrl] = useState(url);

  const [editTitle, setEditTitle] = useState(false);
  const [editUrl, setEditUrl] = useState(false);

  const refTitle = useRef(null);
  const refUrl = useRef(null);

  useEffect(() => {
    if (refTitle.current) {
      refTitle.current.focus();
    }
  }, [editTitle]);

  useEffect(() => {
    if (refUrl.current) {
      refUrl.current.focus();
    }
  }, [editUrl]);

  function handleEditTitle() {
    setEditTitle(true);
  }

  function handleEditUrl() {
    setEditUrl(true);
  }

  function handleOnBlurTitle(e) {
    setEditTitle(false);
    onUpdate(docId, currentTitle, currentUrl);
  }
  function handleOnBlurUrl(e) {
    setEditUrl(false);
    onUpdate(docId, currentTitle, currentUrl);
  }

  function handleOnChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleOnChangeUrl(e) {
    setUrl(e.target.value);
  }

  async function handleDeleteLink(docId){
    await deleteLink(docId);
  }

  return (
    <div className={style.link}>
      <div className={style.linkInfo}>
        <div className={style.linkTitle}>
          {editTitle ? (
            <>
              <input
                ref={refTitle}
                onBlur={handleOnBlurTitle}
                onChange={handleOnChangeTitle}
                value={currentTitle}
              />
            </>
          ) : (
            <>
              <button className={style.btnEdit} onClick={handleEditTitle}><span className="material-icons">edit</span>
              </button>
              {currentTitle}
            </>
          )}
        </div>
        <div className={style.linkUrl}>
          {editUrl ? (
            <>
              <input
                ref={refUrl}
                onBlur={handleOnBlurUrl}
                onChange={handleOnChangeUrl}
                value={currentUrl}
              />
            </>
          ) : (
            <>
              <button className={style.btnEdit} onClick={handleEditUrl}><span className="material-icons">edit</span>
              </button>
              {currentUrl}
            </>
          )}
        </div>
      </div>
      <div className={style.linkActions}>
        <button className={style.btnDelete} onClick={handleDeleteLink}><span className="material-icons">delete</span>
        </button>
      </div>
    </div>
  );
}