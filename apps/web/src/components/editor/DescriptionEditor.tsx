import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Type,
  Eraser
} from 'lucide-react';

interface DescriptionEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const DescriptionEditor = ({ value, onChange, error }: DescriptionEditorProps) => {
  const { t } = useTranslation();
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const ToolbarButton = ({
    onClick,
    title,
    icon: Icon
  }: {
    onClick: () => void;
    title: string;
    icon: React.ElementType;
  }) => (
    <button
      type="button"
      className="btn btn-sm btn-outline-secondary"
      onClick={onClick}
      title={title}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div className="description-editor">
      <div className="toolbar bg-body-secondary p-2 border rounded-top d-flex flex-wrap gap-1">
        <div className="btn-group" role="group">
          <ToolbarButton
            onClick={() => execCommand('bold')}
            title={t('editor.bold')}
            icon={Bold}
          />
          <ToolbarButton
            onClick={() => execCommand('italic')}
            title={t('editor.italic')}
            icon={Italic}
          />
          <ToolbarButton
            onClick={() => execCommand('underline')}
            title={t('editor.underline')}
            icon={Underline}
          />
        </div>

        <div className="btn-group" role="group">
          <select
            className="form-select form-select-sm"
            onChange={(e) => execCommand('fontSize', e.target.value)}
            defaultValue="3"
            title={t('editor.font_size')}
          >
            <option value="1">{t('editor.small')}</option>
            <option value="3">{t('editor.normal')}</option>
            <option value="5">{t('editor.large')}</option>
          </select>
        </div>

        <div className="btn-group" role="group">
          <ToolbarButton
            onClick={() => execCommand('justifyLeft')}
            title={t('editor.align_left')}
            icon={AlignLeft}
          />
          <ToolbarButton
            onClick={() => execCommand('justifyCenter')}
            title={t('editor.align_center')}
            icon={AlignCenter}
          />
          <ToolbarButton
            onClick={() => execCommand('justifyRight')}
            title={t('editor.align_right')}
            icon={AlignRight}
          />
        </div>

        <div className="btn-group" role="group">
          <ToolbarButton
            onClick={() => execCommand('insertUnorderedList')}
            title={t('editor.bullet_list')}
            icon={List}
          />
          <ToolbarButton
            onClick={() => execCommand('insertOrderedList')}
            title={t('editor.numbered_list')}
            icon={ListOrdered}
          />
        </div>

        <div className="btn-group" role="group">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => execCommand('formatBlock', '<h1>')}
            title={t('editor.heading1')}
          >
            H1
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => execCommand('formatBlock', '<h2>')}
            title={t('editor.heading2')}
          >
            H2
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => execCommand('formatBlock', '<h3>')}
            title={t('editor.heading3')}
          >
            H3
          </button>
        </div>

        <ToolbarButton
          onClick={() => execCommand('removeFormat')}
          title={t('editor.clear_formatting')}
          icon={Eraser}
        />
      </div>

      <div
        ref={editorRef}
        contentEditable
        className={`editor-content form-control ${error ? 'is-invalid' : ''}`}
        onInput={handleInput}
        style={{ minHeight: '200px', maxHeight: '400px', overflowY: 'auto' }}
        placeholder={t('description')}
      />

      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};
