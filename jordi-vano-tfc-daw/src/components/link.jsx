import { useEffect, useRef, useState } from "react";
import { deleteLink } from "../firebase/firebase";

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
    <div key={docId}>
      <div>
        <div>
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
              <button onClick={handleEditTitle}>Editar
              </button>
              {currentTitle}
            </>
          )}
        </div>
        <div>
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
              <button onClick={handleEditUrl}>Editar
              </button>
              {currentUrl}
            </>
          )}
        </div>
      </div>
      <div>
        <button onClick={handleDeleteLink}>Eliminar
        </button>
      </div>
    </div>
  );
}