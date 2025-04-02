
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bold, Italic, Link as LinkIcon, Heading1, Heading2, Heading3, Code, 
  ListOrdered, List, Image, Quote, MoreHorizontal, Calendar, Share2,
  Plus, X, FileImage, Table, Type
} from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = useState('');
  const [showCodeLanguages, setShowCodeLanguages] = useState(false);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [topics, setTopics] = useState<string[]>([]);
  const [newTopic, setNewTopic] = useState('');
  const [showAddOptions, setShowAddOptions] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const codeLanguages = [
    'Auto (TypeScript)',
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'Ruby',
    'HTML, XML',
    'CSS',
    'JSON',
    'Markdown',
    'TOML, INI',
    'Kotlin',
    'Lua',
    'Makefile',
  ];

  const addOptions = [
    { icon: <Image size={24} />, label: "Image" },
    { icon: <FileImage size={24} />, label: "Embed" },
    { icon: <Code size={24} />, label: "Code" },
    { icon: <Type size={24} />, label: "Text styles" },
    { icon: <Table size={24} />, label: "Table" },
    { icon: <List size={24} />, label: "List" },
  ];

  const handleSelectionChange = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== '') {
      setSelectedText(selection.toString());
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      setToolbarPosition({
        top: rect.top - 50,
        left: rect.left + rect.width / 2 - 150,
      });
      
      setShowToolbar(true);
    } else {
      setShowToolbar(false);
    }
  };

  const applyFormat = (format: string) => {
    document.execCommand(format);
    setShowToolbar(false);
  };

  const handleCodeButton = () => {
    setShowCodeLanguages(!showCodeLanguages);
  };

  const selectCodeLanguage = (lang: string) => {
    console.log(`Applying ${lang} formatting`);
    setShowCodeLanguages(false);
    
    const codeBlock = `\`\`\`${lang.toLowerCase()}\n\n\`\`\``;
    document.execCommand('insertText', false, codeBlock);
    setShowAddOptions(false);
  };

  const handlePublishClick = () => {
    setPublishDialogOpen(true);
  };

  const handleAddTopic = () => {
    if (newTopic.trim() && topics.length < 5) {
      setTopics([...topics, newTopic.trim()]);
      setNewTopic('');
    }
  };

  const handleRemoveTopic = (topicToRemove: string) => {
    setTopics(topics.filter(topic => topic !== topicToRemove));
  };

  const handlePublishNow = () => {
    console.log({
      title,
      content: contentRef.current?.innerHTML || '',
      topics
    });
    setPublishDialogOpen(false);
  };

  const handleAddOption = (option: string) => {
    console.log(`Adding ${option}`);
    if (option === 'Code') {
      setShowCodeLanguages(true);
    } else if (option === 'Image') {
      // Add image placeholder
      const imagePlaceholder = '<div class="image-placeholder border-2 border-dashed border-gray-300 rounded p-8 my-4 text-center text-gray-500">Click to add an image</div>';
      document.execCommand('insertHTML', false, imagePlaceholder);
    } else {
      // Handle other options
      document.execCommand('insertHTML', false, `<p class="my-2">[${option} placeholder]</p>`);
    }
    
    setShowAddOptions(false);
  };

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-sm text-gray-500">Draft</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">Save</Button>
            <Button onClick={handlePublishClick}>Publish</Button>
          </div>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full text-4xl font-bold mb-6 border-none outline-none placeholder-gray-400"
        />

        <div className="relative">
          {/* Plus Button for adding content */}
          <div className="absolute left-0 -ml-12 top-2">
            <Popover open={showAddOptions} onOpenChange={setShowAddOptions}>
              <PopoverTrigger asChild>
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100">
                  <Plus size={20} className="text-gray-500" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="start" sideOffset={5}>
                <div className="grid gap-1">
                  {addOptions.map((option) => (
                    <button 
                      key={option.label}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md w-full text-left"
                      onClick={() => handleAddOption(option.label)}
                    >
                      <span className="text-gray-600">{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div 
            ref={contentRef}
            contentEditable
            className="prose max-w-none min-h-[50vh] focus:outline-none"
            onInput={(e) => setContent((e.target as HTMLDivElement).innerHTML)}
            data-placeholder="Tell your story..."
          />
        </div>

        {showToolbar && (
          <div 
            className="fixed bg-white rounded-md shadow-lg border border-gray-200 z-50 py-2 px-1 flex items-center gap-2"
            style={{ top: `${toolbarPosition.top}px`, left: `${toolbarPosition.left}px` }}
          >
            <button onClick={() => applyFormat('bold')} className="p-1 hover:bg-gray-100 rounded">
              <Bold size={16} />
            </button>
            <button onClick={() => applyFormat('italic')} className="p-1 hover:bg-gray-100 rounded">
              <Italic size={16} />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <LinkIcon size={16} />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Heading1 size={16} />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Heading2 size={16} />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <ListOrdered size={16} />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <List size={16} />
            </button>
            <button onClick={handleCodeButton} className="p-1 hover:bg-gray-100 rounded">
              <Code size={16} />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Quote size={16} />
            </button>
          </div>
        )}

        {showCodeLanguages && (
          <div 
            className="fixed bg-white rounded-md shadow-lg border border-gray-200 z-50 py-2 w-64 max-h-80 overflow-y-auto"
            style={{ 
              top: showToolbar ? `${toolbarPosition.top + 40}px` : '50%',
              left: showToolbar ? `${toolbarPosition.left}px` : '50%',
              transform: showToolbar ? 'none' : 'translate(-50%, -50%)'
            }}
          >
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <h3 className="font-medium">Select language</h3>
              <button 
                className="text-gray-500 hover:text-gray-700" 
                onClick={() => setShowCodeLanguages(false)}
              >
                <X size={16} />
              </button>
            </div>
            {codeLanguages.map((lang) => (
              <div 
                key={lang} 
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => selectCodeLanguage(lang)}
              >
                {lang}
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Story Preview</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-md h-48 flex items-center justify-center bg-gray-50">
                <div className="text-center p-4">
                  <p className="text-gray-500">Include a high-quality image in your story to make it more inviting to readers.</p>
                  <Button variant="outline" className="mt-2">
                    <Image size={16} className="mr-2" />
                    Add an image
                  </Button>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-md space-y-2">
                <h3 className="font-semibold">{title || "Untitled"}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {content ? content.replace(/<[^>]*>?/gm, '') : "No content yet"}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Publishing to: Sobirjon</h3>
              
              <p className="text-gray-600 mb-2">Add or change topics (up to 5) so readers know what your story is about</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {topics.map(topic => (
                  <div key={topic} className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center gap-1">
                    {topic}
                    <button onClick={() => handleRemoveTopic(topic)} className="text-gray-500">×</button>
                  </div>
                ))}
              </div>
              
              {topics.length < 5 && (
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="Add a topic..."
                    className="border rounded-md px-3 py-1 text-sm flex-1"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTopic()}
                  />
                  <Button variant="outline" size="sm" onClick={handleAddTopic}>Add</Button>
                </div>
              )}
              
              <p className="text-sm text-gray-500 mb-6">
                <a href="#" className="text-blue-600 hover:underline">Learn more</a> about what happens to your post when you publish.
              </p>
              
              <div className="flex gap-3">
                <Button onClick={handlePublishNow} className="bg-green-600 hover:bg-green-700">Publish now</Button>
                <Button variant="outline" className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  Schedule for later
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default WritePage;
