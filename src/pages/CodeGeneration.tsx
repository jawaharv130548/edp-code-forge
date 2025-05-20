import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, RefreshCw, Code, Copy, Download, Save, FileCode } from 'lucide-react';
import { toast } from 'sonner';
import * as mammoth from 'mammoth';

const code_gen_id = '42E9D159A1B9235DDDB2A986';
const code_gen_apikey = '42E9D159A1B9235DDDB2A986:b72aa896208411f6b61070c45e977a31';
const code_gen_url = '/api/agent/EDP-Code-Gen-new/execute';
const SUMMARISE_USER_ID = "A018F9B1F7CC5F379B85BDF4";
const SUMMARISE_API_KEY = "A018F9B1F7CC5F379B85BDF4:8496928c4cae352f20afefd4213a761c";
const SUMMARIZE_API_URL = "/api/agent/summarize/execute";

// Define types
interface GeneratedFile {
  id: string;
  name: string;
  language: 'typescript' | 'javascript' | 'html' | 'css' | 'java' | 'xml';
  code: string;
}

interface InputOption {
  label: string;
  value: string;
}

type ExpectedResponse = {
  output: {
    content: string;
  }
}

type errorResponse = {
  detail: {
    error: string,
    requestId: string // UUID
  }
}

// Frontend component type options
const frontendComponentTypes: InputOption[] = [
  { label: 'HTML', value: 'html' },
  { label: 'Form Component', value: 'form' },
  { label: 'Service Component', value: 'service' },
  { label: 'Routing Component', value: 'routing' },
  { label: 'All', value: 'all' }
];

// Backend component type options
const backendComponentTypes: InputOption[] = [
  { label: 'Entity', value: 'entity' },
  { label: 'Controller', value: 'controller' },
  { label: 'Service', value: 'service' },
  { label: 'Repository', value: 'repository' },
  { label: 'Spring Configuration', value: 'config' },
  { label: 'Junits', value: 'junit' },
  { label: 'All', value: 'all' }
];

const CodeGeneration: React.FC = () => {
  // Input source state
  const [inputSource, setInputSource] = useState<'upload' | 'index'>('upload');
  const [summarization_prompt, setSummarizationPrompt] = useState('');
  const [useCase, setUseCase] = useState('');
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isSummarized, setIsSummarized] = useState(false);

  // Code type and component selection states
  const [selectedCodeType, setSelectedCodeType] = useState<'frontend' | 'backend' | null>(null);
  const [selectedComponentType, setSelectedComponentType] = useState<string | null>(null);

  // Prompt and generation states
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [regenerationPrompt, setRegenerationPrompt] = useState('');
  const [regenerateFileName, setRegenerateFileName] = useState('');

  // Reset generated files when input options change
  useEffect(() => {
    setGeneratedFiles([]);
    setActiveFileId(null);
  }, [inputSource, selectedCodeType, selectedComponentType]);

  // Update prompt text when code type or component type changes
  useEffect(() => {
    if (selectedCodeType && selectedComponentType) {
      setPromptText(getDefaultPrompt());
    }
  }, [selectedCodeType, selectedComponentType]);

  // Get default prompt based on selected options
  const getDefaultPrompt = () => {
    if (!selectedCodeType || !selectedComponentType) return '';

    if (selectedCodeType === 'frontend') {
      switch (selectedComponentType) {
        case 'html':
          return summarization_prompt + '\n\n------------------\n' + `You have a new use case above. Go through all the indexed html, scss files and generate html and scss code based on that. Always reuse existing html, scss and form base components. " +
            Make sure to follow below mentioned rules:
            1. Never generate a new validation pattern.
            2. Use the exact same validation annotations and field constraints found in the retrieved html code.
            3. Do not infer or invent validations.
            4. Don't write business logic that duplicates existing code.
            5. Refer to the indexed validation_sheet file for the validations.
            Making sure of the above rules, create a frontend html code.`;
        case 'form':
          return summarization_prompt + '\n\n------------------\n' + `You have a new use case above. Go through all the indexed typescript,javacript files and generate code based on that. " +
            Make sure to follow the below mentioned rules:
            1. Do not create any new components if a relevant one is already retrieved.
            2. Always reuse existing components, models, services and form base components.
            3. Extend them or invoke their methods only if needed.
            4. Never generate a new validation pattern.
            5. Use the exact same validation annotations and field constraints found in the retrieved typescript(CustomValidator) code.
            6. Do not infer or invent validations.
            7. Use service components to call the APIs.
            8. Don't write business logic that duplicates existing code.
            9. Try creating base component for the use case and extend formbase component and use those method in the created component for business logics.
            10. Use the same DTOs and request/response patterns.
            11. Make sure that the roles are added.
            12. Add validations to the form controls according to the use case.
            13. Refer to the indexed validation_sheet file for the form validations.
            Making sure of the above rules, create a frontend typescript.`;
        case 'service':
          return summarization_prompt + '\n\n------------------\n' + `You have a new use case above. Go through all the indexed typescript,javacript,json files and generate code based on that." +
            Make sure to follow the below mentioned rules:
            1. Do not create any new services if a relevant one is already retrieved.
            2. Always reuse existing services,components, models and form base components.
            3. Extend them or invoke their methods only if needed.
            4. In service components, invoke rest api call methods or helper methods from the retrieved code.
            5. Don't write business logic that duplicates existing code.
            6. Use the same DTOs and request/response patterns.
            Making sure of the above rules, create a frontend angular service code.`;
        case 'routing':
          return summarization_prompt + '\n\n------------------\n' + `You have a new use case above. Go through all the indexed typescript,javacript files and generate code based on that.\n" +
            Make sure to follow the below mentioned rules:
            1. Do not create any new components if a relevant one is already retrieved.
            2. Always reuse existing components, models, services,html, scss and form base components.
            3. Extend them or invoke their methods only if needed.
            4. Don't write business logic that duplicates existing code.
            5. Make sure that the routing is correct and roles are added.
            Making sure of the above rules, create a frontend angular routing code.`;
        default:
          return summarization_prompt + '\n\n------------------\n' + `You have a new use case above. Go through all the indexed html, typescript, javacript, scss, json files and generate code based on that.
            Make sure to follow the below mentioned rules:
            1. Do not create any new components if a relevant one is already retrieved.
            2. Compare the C# code found in mdc_code_data index and generate the angular logic based on that.
            3. Always reuse existing components, models, services, html, scss and form base components.
            4. Extend them or invoke their methods only if needed.
            5. Never generate a new validation pattern.
            6. Use the exact same validation annotations and field constraints found in the retrieved typescript(CustomValidator) code.
            7. Do not infer or invent validations.
            8. In service components, invoke rest api call methods or helper methods from the retrieved code.
            9. Don't write business logic that duplicates existing code.
            10. Try creating base component for the use case and extend formbase component and use those method in the created component for business logics.
            11. Use the same DTOs and request/response patterns.
            12. Make sure that the routing is correct and roles are added.
            13. Add validations to the form controls according to the use case.
            Making sure of the above rules, create a frontend angular module.`;
      }
    } else {
      switch (selectedComponentType) {
        case 'entity':
          return summarization_prompt + '\n\n------------------\n' + `You have a new use case above. Go through all the indexed java files and generate code based on that. Make sure to follow the below mentioned rules: -
            1. Do not create any new entity class if a relevant one is already retrieved.
            2. Always reuse existing entities, domain objects, and abstract classes. Extend them or invoke their methods only if needed.
            3. Never generate a new validation pattern. Use the exact same validation annotations and field constraints found in the retrieved entity code. Do not infer or invent validations. Refer to the indexed validation_sheet file for the length, pattern , allowed characters validations.
            4. Don't write business logic that duplicates existing code.
            5. Use the database design indexed sheet for columns names,table name, validations and database design.
            6. Make sure to use perspectives like @Read @Write to all the columns.
            Making sure of the above rules, create a backend spring boot entity class using java.`;
        case 'controller':
          return summarization_prompt + '\n\n------------------\n' + `You have a new use case above. Go through all the indexed java files and generate code based on that. Make sure to follow the below mentioned rules: -
            1. Do not create any new entity class if a relevant one is already retrieved. Always reuse existing entities, domain objects, and abstract classes. Extend them or invoke their methods only if needed.
            2. Never generate a new validation pattern.
            3. Use the exact same validation annotations and field constraints found in the retrieved entity code. Do not infer or invent validations.
            4. Don't write business logic that duplicates existing code.
            5. Controllers must always use POST mappings.
            6. Never introduce logic in the controller — call domain/service methods as done in the retrieved code.
            7. Use the same DTOs and request/response patterns.
            8. Add bean validations as per the indexed file.
            9. Use Rest Naming conventions to the endpoint.
            Making sure of the above rules, create a backend spring boot controller using java.`;
        case 'service':
          return summarization_prompt + '\n\n------------------\n' + `You have a new use case above. Go through all the indexed java files and generate code based on that. Make sure to follow the below mentioned rules: -
            1. Do not create any new entity class if a relevant one is already retrieved.
            2. Always reuse existing entities, domain objects, and abstract classes.
            3. Extend them or invoke their methods only if needed.
            4. In service classes, invoke domain methods or helper classes from the retrieved code.
            5. Don't write business logic that duplicates existing code.
            6. Use the same DTOs and request/response patterns.
            7. Add bean validations as per the indexed file.
            Making sure of the above rules, create a backend spring boot service using java`;
        case 'repository':
          return summarization_prompt + '\n\n------------------\n' + `You have a new use case above. Go through all the indexed java files and generate code based on that. Make sure to follow the below mentioned rules: -
            1. Always reuse existing entities, domain objects, and abstract classes.
            2. Extend them or invoke their methods only if needed.
            3. For repositories, use the same inheritance and method naming style.
            4. Do not define new repository interfaces unless there is absolutely no reusable one.
            5. Don't write business logic that duplicates existing code.
            6. Use the same DTOs and request/response patterns.
            Making sure of the above rules, create a backend spring boot repository using java`;
        case 'config':
          return summarization_prompt + '\n\n------------------\n' + `You have a new use case above. Go through all the indexed java files and generate code based on that. Make sure to follow the below mentioned rules: -
            1. Make sure to follow the process flow in the above use case if mentioned.
            2. Make sure to create enums for current state and target state
            3. Final action would be to send email, so also create an ftl file for email generation according to the body mentioned in the above use case
            Making sure of the above rules, create a backend spring boot configuration using java`;
        case 'junit':
          return summarization_prompt + '\n\n------------------\n' + `You have a new use case above. Generate Junits classes for controller, entity, dtos according to the use case. Go through all the indexed files and generate parameterized test cases according to it. Refer to mockito_junit_classes.txt index for reference. Make sure to follow the below mentioned rules: -
            1. Add positive, negative and boundary scenarios for all the cases considered.
            2. Do not miss even a single line in writing the junits.
            3. All the lines from controller, entity, service, dto, repo should be covered.
            4. If there are bean validations present in the entity class, write bean validations tests.
            5. These bean validation tests should be covered in controlelr and entity test classes.
            Making sure of the above rules, create a backend spring boot test classes using java.`;
        default:
          return summarization_prompt + '\n\n------------------\n' + `You have a new use case above. Go through all the indexed java files and generate code based on that. Follow the below rules for generation: -
            1. Refer to the currently indexed java files for structure and how the application flow is.
            2. Compare the C# code found in mdc_code_data index and generate the java logic based on that.
            3. Do not create any new entity class if a relevant one is already retrieved. Always reuse existing entities, domain objects, and abstract classes. Extend them or invoke their methods only if needed.
            4. Never generate a new validation pattern. Use the exact same validation annotations and field constraints found in the retrieved entity code. You can refer to validations sheet which is indexed for Pac Change attributes.
            5. For repositories, use the same inheritance and method naming style. Do not define new repository interfaces unless there is absolutely no reusable one.
            6. In service classes, invoke domain methods or helper classes from the retrieved code. Don’t write business logic that duplicates existing code.
            7. Controllers must always use POST mappings. Never introduce logic in the controller — call domain/service methods as done in the retrieved code.
            8. Use the same DTOs and request/response patterns.Add bean validations as per the indexed file.
            Making sure of the above rules, create a backend spring boot module using java.`;
      }
    }
  };

  const readFileAndSetPrompt = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    const prompt = result.value.trim();
    setSummarizationPrompt(prompt);
    return prompt;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success('File uploaded successfully');
      const prompt = await readFileAndSetPrompt(file);
      setIsFileUploaded(true);

      // Now use the prompt directly
      const response = await fetch(SUMMARIZE_API_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-user-id': SUMMARISE_USER_ID,
          'x-authentication': 'api-key ' + SUMMARISE_API_KEY,
        },
        body: JSON.stringify({
          "input": {
            "query": prompt + '\n\n------------------\n' + 'Reformat the above use case in such a way that I can use it as a prompt to the RAG model. MAKE SURE THAT YOU DONT MISS ANY DETAILS. NOT EVEN A SINGLE THING SHOULD BE MISSED.'
          }
        }),
      });

      const parsedResponse = await response.json() as ExpectedResponse | errorResponse;

      if ('output' in parsedResponse) {
        setSummarizationPrompt(parsedResponse.output.content);
      } else {
        throw new Error(parsedResponse.detail?.error || 'Unknown error');
      }

      setTimeout(() => {
        toast.success('Content summarized successfully');
        setIsSummarized(true);
      }, 1500);
    }
  };

  const handleCodeTypeSelect = (type: 'frontend' | 'backend') => {
    setSelectedCodeType(type);
    setSelectedComponentType(null);
  };

  const handleComponentTypeSelect = (value: string) => {
    setSelectedComponentType(value);
    setPromptText(getDefaultPrompt());
  };

  const generateCode = async (): Promise<ExpectedResponse> => {
    const response = await fetch(code_gen_url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-user-id': code_gen_id,
        'x-authentication': 'api-key ' + code_gen_apikey,
      },
      body: JSON.stringify({
        "input": {
          "query": promptText
        }
      }),
    });

    const parsedResponse = await response.json() as ExpectedResponse | errorResponse;

    if ('output' in parsedResponse) {
      return parsedResponse as ExpectedResponse;
    } else {
      throw new Error(parsedResponse.detail?.error || 'Unknown error');
    }
  }

  const handleGenerateCode = () => {
    if (!selectedCodeType || !selectedComponentType) {
      toast.error('Please select component type');
      return;
    }

    // Simulate code generation
    toast.info('Generating code...');

    setTimeout(async () => {
      const files: GeneratedFile[] = [];

      if (selectedCodeType === 'frontend') {
        if (selectedComponentType === 'html') {
          files.push({
            id: 'html_file',
            name: 'html_file',
            language: 'html',
            code: (await generateCode()).output.content
          });
        } else if (selectedComponentType === 'form') {
          files.push({
            id: 'ts_file',
            name: 'ts_file',
            language: 'typescript',
            code: (await generateCode()).output.content
          });
        } else if (selectedComponentType === 'service') {
          files.push({
            id: 'service_file',
            name: 'service_file',
            language: 'typescript',
            code: (await generateCode()).output.content
          });
        } else if (selectedComponentType === 'routing') {
          files.push({
            id: 'routing_file',
            name: 'routing_file',
            language: 'typescript',
            code: (await generateCode()).output.content
          });
        } else if (selectedComponentType === 'all') {
          files.push({
            id: 'all_file',
            name: 'all_file',
            language: 'typescript',
            code: (await generateCode()).output.content
          });
        }
      } else if (selectedCodeType === 'backend') {
        if (selectedComponentType === 'entity') {
          files.push({
            id: 'entity_file',
            name: 'entity_file',
            language: 'java',
            code: (await generateCode()).output.content
          });
        } else if (selectedComponentType === 'controller') {
          files.push({
            id: 'controller_file',
            name: 'controller_file',
            language: 'java',
            code: (await generateCode()).output.content
          });
        } else if (selectedComponentType === 'service') {
          files.push({
            id: 'service_file',
            name: 'service_file',
            language: 'java',
            code: (await generateCode()).output.content
          });
        } else if (selectedComponentType === 'repository') {
          files.push({
            id: 'repository_file',
            name: 'repository_file',
            language: 'java',
            code: (await generateCode()).output.content
          });
        } else if (selectedComponentType === 'config') {
          files.push({
            id: 'config_file',
            name: 'config_file',
            language: 'java',
            code: (await generateCode()).output.content
          });
        } else if (selectedComponentType === 'junit') {
          files.push({
            id: 'junit_file',
            name: 'junit_file',
            language: 'java',
            code: (await generateCode()).output.content
          });
        } else if (selectedComponentType === 'all') {
          files.push({
            id: 'all_file',
            name: 'all_file',
            language: 'java',
            code: (await generateCode()).output.content
          });
        }
      }

      if (files.length > 0) {
        setGeneratedFiles(files);
        setActiveFileId(files[0].id);
        toast.success('Code generated successfully');
      } else {
        toast.error('Failed to generate code');
      }
    }, 2000);
  };

  const handleRegenerateCode = () => {
    if (!regenerationPrompt.trim() || !regenerateFileName.trim()) {
      toast.error('Please enter both filename and regeneration instructions');
      return;
    }
    toast.info('Regenerating code...');
    setTimeout(() => {
      const updatedFiles = generatedFiles.map(file => {
        if (file.name === regenerateFileName) {
          let updatedCode = file.code;
          // Check language type
          if (['typescript', 'javascript', 'java'].includes(file.language)) {
            updatedCode = `// Regenerated based on feedback: ${regenerationPrompt}\n\n${file.code}`;
          } else if (file.language === 'html') {
            updatedCode = `<!-- Regenerated based on feedback: ${regenerationPrompt} -->\n\n${file.code}`;
          } else if (file.language === 'css') {
            updatedCode = `/* Regenerated based on feedback: ${regenerationPrompt} */\n\n${file.code}`;
          } else if (file.language === 'xml') {
            updatedCode = `<!-- Regenerated based on feedback: ${regenerationPrompt} -->\n\n${file.code}`;
          }
          return {
            ...file,
            code: updatedCode
          };
        }
        return file;
      });
      setGeneratedFiles(updatedFiles);
      toast.success('Code regenerated successfully');
      setRegenerationPrompt('');
      setRegenerateFileName('');
    }, 1500);
  };

  const handleCopyCode = () => {
    const activeFile = generatedFiles.find(file => file.id === activeFileId);
    if (activeFile) {
      navigator.clipboard.writeText(activeFile.code);
      toast.success(`${activeFile.name} copied to clipboard`);
    }
  };

  const handleDownloadCode = () => {
    const activeFile = generatedFiles.find(file => file.id === activeFileId);
    if (activeFile) {
      const blob = new Blob([activeFile.code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = activeFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(`${activeFile.name} downloaded successfully`);
    }
  };

  const handleDownloadAllFiles = () => {
    toast.success('All files downloaded as zip');
  };

  const handleSaveCode = () => {
    if (generatedFiles.length > 0) {
      toast.success('Code saved successfully');
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Code Generation</h1>
      <p className="text-muted-foreground mb-6">
        Generate code from specifications using AI
      </p>

      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Step 1: Input Source</h2>

        <div className="mb-4 flex items-center gap-2">
          <RadioGroup
            value={inputSource}
            onValueChange={(value) => setInputSource(value as 'upload' | 'index')}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upload" id="upload" />
              <Label htmlFor="upload">Upload Specification Document</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="index" id="index" />
              <Label htmlFor="index">Refer Uploaded Document Index</Label>
            </div>
          </RadioGroup>
        </div>

        {inputSource === 'index' ? (
          <div className="mb-4">
            <Label htmlFor="useCase" className="mb-2 block">Specify Use Case</Label>
            <Textarea
              id="useCase"
              placeholder="Describe the use case you want to generate code for..."
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className="min-h-32"
            />
          </div>
        ) : (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
              accept=".txt,.md,.doc,.docx"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-1">Upload Specification Document</p>
              <p className="text-sm text-muted-foreground">
                Upload your use case, design, and database design document (.txt, .md, .doc, .docx)
              </p>
            </label>
          </div>
        )}
      </Card>

      {(inputSource === 'index' || isSummarized) && (
        <>
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Step 2: Select Code Type</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                variant={selectedCodeType === 'frontend' ? 'default' : 'outline'}
                className="h-20 justify-start p-4"
                onClick={() => handleCodeTypeSelect('frontend')}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500/10 p-2 rounded">
                    <Code className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Frontend Code</p>
                    <p className="text-xs text-muted-foreground">Generate Angular TypeScript and HTML components</p>
                  </div>
                </div>
              </Button>

              <Button
                variant={selectedCodeType === 'backend' ? 'default' : 'outline'}
                className="h-20 justify-start p-4"
                onClick={() => handleCodeTypeSelect('backend')}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500/10 p-2 rounded">
                    <Code className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Backend Code</p>
                    <p className="text-xs text-muted-foreground">Generate Spring Boot Java components</p>
                  </div>
                </div>
              </Button>
            </div>
          </Card>

          {selectedCodeType && (
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Step 3: Select Component Type</h2>

              <div className="mb-4">
                <Label htmlFor="componentType" className="mb-2 block">Component Type</Label>
                <Select
                  value={selectedComponentType || ''}
                  onValueChange={handleComponentTypeSelect}
                >
                  <SelectTrigger id="componentType">
                    <SelectValue placeholder="Select component type" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCodeType === 'frontend'
                      ? frontendComponentTypes.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))
                      : backendComponentTypes.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>

              {selectedComponentType && (
                <>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Code generation prompt:</p>
                    <div className="flex items-center gap-2">
                      <RadioGroup defaultValue="default" className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="default"
                            id="default"
                            checked={!isEditingPrompt}
                            onClick={() => setIsEditingPrompt(false)}
                          />
                          <Label htmlFor="default">Use Default</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="custom"
                            id="custom"
                            checked={isEditingPrompt}
                            onClick={() => setIsEditingPrompt(true)}
                          />
                          <Label htmlFor="custom">Customize</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  {isEditingPrompt ? (
                    <Textarea
                      className="min-h-32"
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                    />
                  ) : (
                    <div className="bg-secondary p-4 rounded-md text-sm">
                      {promptText}
                    </div>
                  )}

                  <Button className="mt-4" onClick={handleGenerateCode}>
                    Generate Code
                  </Button>
                </>
              )}
            </Card>
          )}

          {generatedFiles.length > 0 && (
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Step 4: Generated Code</h2>

              <Tabs defaultValue="code">
                <TabsList>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="code">
                  <div className="mb-4">
                    <div className="flex border-b border-border overflow-x-auto py-2 mb-4">
                      {generatedFiles.map((file) => (
                        <button
                          key={file.id}
                          className={`flex items-center px-3 py-2 text-sm font-medium whitespace-nowrap ${file.id === activeFileId ? 'bg-secondary rounded-t border-b-2 border-blue-500' : 'text-muted-foreground'
                            }`}
                          onClick={() => setActiveFileId(file.id)}
                        >
                          <FileCode className="h-4 w-4 mr-2" />
                          {file.name}
                        </button>
                      ))}
                    </div>

                    {activeFileId && (
                      <div className="code-block mb-4">
                        <pre className="text-sm max-h-96 overflow-auto bg-secondary p-4 rounded-md">
                          <code>{generatedFiles.find(f => f.id === activeFileId)?.code}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="copy-button absolute top-2 right-2"
                          onClick={handleCopyCode}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={handleCopyCode}>
                      <Copy className="h-4 w-4 mr-2" /> Copy Current File
                    </Button>
                    <Button variant="outline" onClick={handleDownloadCode}>
                      <Download className="h-4 w-4 mr-2" /> Download Current File
                    </Button>
                    <Button variant="outline" onClick={handleDownloadAllFiles}>
                      <Download className="h-4 w-4 mr-2" /> Download All Files
                    </Button>
                    <Button variant="outline" onClick={handleSaveCode}>
                      <Save className="h-4 w-4 mr-2" /> Save Project
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Regenerate Code</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Provide additional instructions to improve or modify a specific file.
                </p>

                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div>
                    <Label htmlFor="regenerateFileName" className="mb-2 block">File to Regenerate</Label>
                    <Select value={regenerateFileName} onValueChange={setRegenerateFileName}>
                      <SelectTrigger id="regenerateFileName">
                        <SelectValue placeholder="Select file to regenerate" />
                      </SelectTrigger>
                      <SelectContent>
                        {generatedFiles.map((file) => (
                          <SelectItem key={file.id} value={file.name}>{file.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="regenerationPrompt" className="mb-2 block">Regeneration Instructions</Label>
                    <Textarea
                      id="regenerationPrompt"
                      placeholder="Example: Add pagination to the user list, improve error handling..."
                      value={regenerationPrompt}
                      onChange={(e) => setRegenerationPrompt(e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={handleRegenerateCode}>
                  <RefreshCw className="h-4 w-4 mr-2" /> Regenerate File
                </Button>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default CodeGeneration;