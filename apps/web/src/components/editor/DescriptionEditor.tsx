import { useRef, useEffect, useState, useCallback } from 'react';
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
  Eraser,
  Pilcrow,
  Heading1,
  Heading2,
  Heading3,
} from 'lucide-react';

interface DescriptionEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const DescriptionEditor = ({ value, onChange, error }: DescriptionEditorProps) => {
  const { t } = useTranslation();
  const editorRef = useRef<HTMLDivElement>(null);
  const [hasContent, setHasContent] = useState(false);

  const [toolbarState, setToolbarState] = useState({
    bold: false,
    italic: false,
    underline: false,
    unordered: false,
    ordered: false,
    alignLeft: false,
    alignCenter: false,
    alignRight: false,
    fontSize: '3',
    block: 'p',
  });

  useEffect(() => {
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('defaultParagraphSeparator', false, 'p');
  }, []);

  const updateToolbar = useCallback(() => {
    setToolbarState({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      unordered: document.queryCommandState('insertUnorderedList'),
      ordered: document.queryCommandState('insertOrderedList'),
      alignLeft: document.queryCommandState('justifyLeft'),
      alignCenter: document.queryCommandState('justifyCenter'),
      alignRight: document.queryCommandState('justifyRight'),
      fontSize: document.queryCommandValue('fontSize') || '3',
      block: (document.queryCommandValue('formatBlock') || 'p').toLowerCase(),
    });
  }, []);

  useEffect(() => {
    const handleSelection = () => updateToolbar();
    document.addEventListener('selectionchange', handleSelection);
    updateToolbar();
    return () => document.removeEventListener('selectionchange', handleSelection);
  }, [updateToolbar]);

  const checkContent = () => {
    if (!editorRef.current) return;
    setHasContent(editorRef.current.innerText.trim().length > 0);
  };

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
    checkContent();
    updateToolbar();
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      checkContent();
    }
  };

  const execCommand = (command: string, arg?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, arg ?? null);
    updateToolbar();
  };

  const ToolbarButton = ({
    onClick,
    title,
    icon: Icon,
    isActive = false,
  }: {
    onClick: () => void;
    title: string;
    icon: React.ElementType;
    isActive?: boolean;
  }) => (
    <button
      type="button"
      className={`btn btn-sm btn-outline-secondary ${isActive ? 'active' : ''}`}
      onClick={onClick}
      title={title}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div className="description-editor">
      <div className="toolbar bg-body-secondary p-2 border rounded-top d-flex flex-wrap gap-1">
        {/* Bold, Italic, Underline */}
        <div className="btn-group" role="group">
          <ToolbarButton
            onClick={() => execCommand('bold')}
            title={t('editor.bold')}
            icon={Bold}
            isActive={toolbarState.bold}
          />
          <ToolbarButton
            onClick={() => execCommand('italic')}
            title={t('editor.italic')}
            icon={Italic}
            isActive={toolbarState.italic}
          />
          <ToolbarButton
            onClick={() => execCommand('underline')}
            title={t('editor.underline')}
            icon={Underline}
            isActive={toolbarState.underline}
          />
        </div>

        {/* Font size */}
        <div className="btn-group" role="group">
          <select
            className="form-select form-select-sm"
            value={toolbarState.fontSize}
            onChange={(e) => {
              editorRef.current?.focus();
              execCommand('fontSize', e.target.value);
            }}
            title={t('editor.font_size')}
          >
            <option value="1">{t('editor.small')}</option>
            <option value="3">{t('editor.normal')}</option>
            <option value="5">{t('editor.large')}</option>
            <option value="7">{t('editor.extra_large') || 'Extra Large'}</option>
          </select>
        </div>

        {/* Alignment */}
        <div className="btn-group" role="group">
          <ToolbarButton
            onClick={() => execCommand('justifyLeft')}
            title={t('editor.align_left')}
            icon={AlignLeft}
            isActive={toolbarState.alignLeft}
          />
          <ToolbarButton
            onClick={() => execCommand('justifyCenter')}
            title={t('editor.align_center')}
            icon={AlignCenter}
            isActive={toolbarState.alignCenter}
          />
          <ToolbarButton
            onClick={() => execCommand('justifyRight')}
            title={t('editor.align_right')}
            icon={AlignRight}
            isActive={toolbarState.alignRight}
          />
        </div>

        {/* Lists */}
        <div className="btn-group" role="group">
          <ToolbarButton
            onClick={() => execCommand('insertUnorderedList')}
            title={t('editor.bullet_list')}
            icon={List}
            isActive={toolbarState.unordered}
          />
          <ToolbarButton
            onClick={() => execCommand('insertOrderedList')}
            title={t('editor.numbered_list')}
            icon={ListOrdered}
            isActive={toolbarState.ordered}
          />
        </div>

        {/* Paragraph & Headings */}
        <div className="btn-group" role="group">
          <ToolbarButton
            onClick={() => execCommand('formatBlock', '<p>')}
            title={t('editor.paragraph') || 'Paragraph'}
            icon={Pilcrow}
            isActive={toolbarState.block === 'p'}
          />
          <ToolbarButton
            onClick={() => execCommand('formatBlock', '<h1>')}
            title={t('editor.heading1')}
            icon={Heading1}
            isActive={toolbarState.block === 'h1'}
          />
          <ToolbarButton
            onClick={() => execCommand('formatBlock', '<h2>')}
            title={t('editor.heading2')}
            icon={Heading2}
            isActive={toolbarState.block === 'h2'}
          />
          <ToolbarButton
            onClick={() => execCommand('formatBlock', '<h3>')}
            title={t('editor.heading3')}
            icon={Heading3}
            isActive={toolbarState.block === 'h3'}
          />
        </div>

        {/* Clear formatting */}
        <div className="btn-group" role="group">
          <ToolbarButton
            onClick={() => execCommand('removeFormat')}
            title={t('editor.clear_formatting')}
            icon={Eraser}
          />
        </div>
      </div>

      <div className="position-relative">
        <div
          ref={editorRef}
          contentEditable
          className={`form-control ${error ? 'is-invalid' : ''}`}
          onInput={() => {
            handleInput();
            updateToolbar();
          }}
          onMouseUp={updateToolbar}
          onKeyUp={updateToolbar}
          style={{ minHeight: '200px', maxHeight: '400px', overflowY: 'auto' }}
          suppressContentEditableWarning
        />

        <span
          className="position-absolute text-muted"
          style={{
            top: '0.375rem',
            left: '0.75rem',
            pointerEvents: 'none',
            display: hasContent ? 'none' : 'block',
            userSelect: 'none',
          }}
        >
          {t('description')}
        </span>
      </div>

      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};