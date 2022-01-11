
import React from "react";
import { connect } from "react-redux";
import { saveForm, selectError, FormEdit, Errors } from "react-formio";
import { push } from "connected-react-router";
import { Translation } from "react-i18next";
import { SUBMISSION_ACCESS } from "../../constants/constants";
import { addHiddenApplicationComponent } from "../../constants/applicationComponent";

const Create = React.memo((props) => {
  return (
    <div>
      <h2><Translation>{(t)=>t("create_form")}</Translation></h2>
      <hr />
      <Errors errors={props.errors} />
      <FormEdit options={{
							language: 'ch',
							i18n: {
							  en: {
                'Text Field':'Text Field',
                'Text Area':'Text Area',
                'Number':'Number',
                'Password':'Password',
                'Checkbox':'Checkbox',
                'Select Boxes':'Select Boxes',
                'Select':'Select',
                'Radio':'Radio',
                'Button':'Button',
                'Text Area With Analytics':'Text Area With Analytics',
                'Data':'Data',
                'Display':'Display',
								'Submit': 'Submit',
                'Email':'Email',
                'Url':'Url',
                'Phone Number':'Phone Number',
                'Tags':'Tags',
                'Address':'Address',
                'Date / Time':'Date / Time',
                'Day':'Day',
                'Time':'Time',
                'Currency':'Currency',
                'Survey':'Survey',
                'Signature':'Signature',
                'HTML':'HTML',
                'Content':'Content',
                'Columns':'Columns',
                'Field Set':'Field Set',
                'Panel':'Panel',
                'Table':'Table',
                'Tabs':'Tabs',
                'Well':'Well',
                'Hidden':'Hidden',
                'Container':'Container',
                'Data Map':'Data Map',
                'Data Grid':'Data Grid',
                'Edit Grid':'Edit Grid',
                'Tree':'Tree',
                'reCAPTCHA':'reCAPTCHA',
                'Resource':'Resource',
                'File':'File',
                'Nested':'Nested',
                'Custom':'Custom'
							  },
							  ch: {
                  'Text Field':'文本域',
                  'Text Area':'文本区',
                  'Number':'数字',
                  'Password':'密码',
                  'Checkbox':'复选框',
                  'Select Boxes':'选择框',
                  'Select':'选择',
                  'Radio':'收音机',
                  'Button':'按钮',
                  'Text Area With Analytics':'带有分析的文本区域',
                  'Data':'数据',
                  'Display':'展示',
                  'Submit': '提交',
                  'Email':'电子邮件',
                  'Url':'网址',
                  'Phone Number':'电话号码',
                  'Tags':'标签',
                  'Address':'地址',
                  'Date / Time':'约会时间',
                  'Day':'日',
                  'Time':'时间',
                  'Currency':'货币',
                  'Survey':'民意调查',
                  'Signature':'签名',
                  'HTML':'HTML',
                  'Content':'内容',
                  'Columns':'列',
                  'Field Set':'字段集',
                  'Panel':'控制板',
                  'Table':'桌子',
                  'Tabs':'标签',
                  'Well':'好',
                  'Hidden':'隐',
                  'Container':'容器',
                  'Data Map':'数据地图',
                  'Data Grid':'数据网格',
                  'Edit Grid':'编辑网格',
                  'Tree':'树',
                  'reCAPTCHA':'验证码',
                  'Resource':'资源',
                  'File':'文件',
                  'Nested':'嵌套',
                  'Custom':'风俗',
                  'Basic':'基本的',
                  'Advanced':'先进的',
                  'Layout':'布局',
                  'Premium':'优质的',
                  'Drag and Drop a form component':'拖放表单组件',
                  'Preview':'预览',
                  'The minimum length requirement this field must meet.':'此字段必须满足的最小长度要求',
                  'Label':'标签',
                  'The label for this field that will appear next to it.':'此字段旁边将显示的标签。',
                  'Label Position':'标签位置',
                  'Position for the label for this field.':'此字段的标签位置。',
                  'Placeholder':'占位符',
                  'The placeholder text that will appear when this field is empty.':'此字段为空时将显示的占位符文本。',
                  'Description':'描述',
                  'The description is text that will appear below the input field.':'描述是将出现在输入字段下方的文本。',
                  'Tooltip':'工具提示',
                  'Adds a tooltip to the side of this field.':'在此字段的一侧添加工具提示。',
                  'To add a tooltip to this field, enter text here.':'要向该字段添加工具提示，请在此处输入文本。',
                  'Description for this field.':'此字段的说明。',
                  'Prefix':'字首',
                  'Suffix':'后缀',
                  'Widget':'小工具',
                  'The widget is the display UI used to input the value of the field.':'小部件是用于输入字段值的显示 UI。',
                  'Right (Left-aligned)':'右（左对齐）',
                  'Left (Left-aligned)':'左（左对齐）',
                  'Left (Right-aligned)':'左（右对齐）',
                  'Right (Right-aligned)':'右（右对齐）',
                  'Bottom':' 底部',
                  'Component':'零件',
                  'Top':'最佳',
                  'Label Width':'标签宽度',
                  'The width of label on line in percentages.':'在线标签的宽度（以百分比表示）。',
                  'Label Margin':'标签页边距',
                  'The width of label margin on line in percentages.':'线上标签边距的宽度，以百分比表示。',
                  'Rows':'行',
                  'Input Field':'输入字段',
                  'Calendar Picker':'日历选择器',
                  'Select a widget':'选择一个小部件',
                  'Input Mask':'输入掩码',
                  'Widget Settings':'小工具设置',
                  'Allow Multiple Masks':'允许多个掩码',
                  'Input Masks':'输入掩码',
                  'Mask':'面具',
                  'Add Another':'加上另一个',
                  'Custom CSS Class':'自定义 CSS 类',
                  'Custom CSS class to add to this component.':'要添加到此组件的自定义 CSS 类。',
                  'Tab Index':'标签索引',
                  'Sets the tabindex attribute of this component to override the tab order of the form. See the MDN documentation on tabindex for more information.':'设置此组件的 tabindex 属性以覆盖表单的 Tab 键顺序。有关更多信息，请参阅有关 tabindex 的 MDN 文档。',
                  'Autocomplete':'自动完成',
                  'Indicates whether input elements can by default have their values automatically completed by the browser. See the MDN documentation on autocomplete for more information.':'指示默认情况下输入元素是否可以由浏览器自动完成其值。有关更多信息，请参阅有关自动完成的 MDN 文档。',
                  'A hidden field is still a part of the form, but is hidden from view.':'隐藏字段仍然是表单的一部分，但在视图中是隐藏的。',
                  'Hide Label':'隐藏标签',
                  'Show Word Counter':'显示字计数器',
                  'Show a live count of the number of words.':'显示字数的实时计数。',
                  'Hide the label (title, if no label) of this component. This allows you to show the label in the form builder, but not when it is rendered.':'隐藏该组件的标签（标题，如果没有标签）。这允许您在表单构建器中显示标签，但在呈现时不显示',
                  'Show Character Counter':'显示字符计数器',
                  'Show a live count of the number of characters.':'显示字符数的实时计数。',
                  'Hide Input':'隐藏输入',
                  'Hide the input in the browser. This does not encrypt on the server. Do not use for passwords.':'在浏览器中隐藏输入。这不会在服务器上加密。不要用于密码。',
                  'Initial Focus':'初始焦点',
                  'Make this field the initially focused element on this form.':'使该字段成为此表单上最初关注的元素。',
                  'Allow Spellcheck':'允许拼写检查',
                  'Disabled':'残障人士',
                  'Disable the form input.':'禁用表单输入。',
                  'Table View':'表格视图',
                  'Shows this value within the table view of the submissions.':'在提交的表格视图中显示此值。',
                  'Modal Edit':'模态编辑',
                  'Opens up a modal to edit the value of this component.':'打开一个模式来编辑这个组件的值。',
                  'Multiple Values':'多个值',
                  'Allows multiple values to be entered for this field.':'允许为此字段输入多个值。',
                  'Default Value':'默认值',
                  'The will be the value for this field, before user interaction. Having a default value will override the placeholder text.':'将是用户交互之前该字段的值。具有默认值将覆盖占位符文本。',
                  'Persistent':'执着的',
                  'A persistent field will be stored in database when the form is submitted.':'提交表单时，持久性字段将存储在数据库中。',
                  'None':'没有任何',
                  'Server':'服务器',
                  'Client':'客户',
                  'Input Format':'输入格式',
                  'Force the output of this field to be sanitized in a specific format.':'强制以特定格式清理此字段的输出。',
                  'Plain':'清楚的',
                  'Type to search':'输入搜索',
                  'Raw (Insecure)':'原始（不安全）',
                  'Protected':'受保护',
                  'A protected field will not be returned when queried via API.':'通过 API 查询时不会返回受保护的字段。',
                  'Database Index':'数据库索引',
                  'Set this field as an index within the database. Increases performance for submission queries.':'将此字段设置为数据库中的索引。提高提交查询的性能。',
                  'Text Case':'文本大小写',
                  'When data is entered, you can change the case of the value.':'输入数据时，可以更改值的大小写。',
                  'Mixed (Allow upper and lower case)':'混合（允许大小写）',
                  'Uppercase':'大写',
                  'Lowercase':'小写',
                  'Encrypted (Enterprise Only)':'加密（仅限企业）',
                  'Encrypt this field on the server. This is two way encryption which is not suitable for passwords.':'在服务器上加密此字段。这是不适合密码的双向加密。',
                  'Redraw On':'重绘',
                  'Redraw this component if another component changes. This is useful if interpolating parts of the component like the label.':'如果另一个组件发生变化，则重绘该组件。如果插入组件的部分（如标签），这很有用。',
                  'Any Change':'任何改变',
                  'Clear Value When Hidden':'隐藏时清除值',
                  'When a field is hidden, clear the value.':'隐藏字段时，清除该值。',
                  'The following variables are available in all scripts.':'以下变量在所有脚本中都可用。',
                  'Custom Default Value':'自定义默认值',
                  'form':'形式',
                  'The complete form JSON object':'完整的表单 JSON 对象',
                  'submission':'提交',
                  '	The complete submission object.':'完整的提交对象。',
                  'data':'数据',
                  'The complete submission data object.':'完整的提交数据对象。',
                  'row':'排',
                  'Contextual "row" data, used within DataGrid, EditGrid, and Container components':'上下文“行”数据，在 DataGrid、EditGrid 和 Container 组件中使用',
                  'component':'零件',
                  'The current component JSON':'当前组件 JSON',
                  'instance':'实例',
                  'The current component instance.':'当前组件实例。',
                  'value':'价值',
                  'The current value of the component.':'组件的当前值。',
                  'moment':'片刻',
                  'The moment.js library for date manipulation.':'用于日期操作的 moment.js 库。',
                  'utils':'实用程序',
                  'util':'实用程序',
                  'An alias for "utils".':'“utils”的别名。',
                  'JavaScript':'JavaScript',
                  'Enter custom javascript code.':'输入自定义 JavaScript 代码。',
                  'Example:':'例子：',
                  //'value':'价值',
                  'JSONLogic':'JSON逻辑',
                  'Execute custom logic using ':'使用执行自定义逻辑',
                  'support is provided using an "_" before each operation, such as {"_sum": {var: "data.a"}}':'在每个操作之前使用“_”提供支持，例如 {"_sum": {var: "data.a"}}',
                  'Full':'满的',
                  'Calculated Value':'计算值',
                  'token':'令牌',
                  'The decoded JWT token for the authenticated user.':'经过身份验证的用户的解码 JWT 令牌。',
                  'The complete submission object.':'完整的提交对象。',
                  'Calculate Value on server':'在服务器上计算值',
                  'Checking this will run the calculation on the server. This is useful if you wish to override the values submitted with the calculations performed on the server.':'选中此项将在服务器上运行计算。如果您希望使用在服务器上执行的计算来覆盖提交的值，这将很有用。',
                  'Allow Manual Override of Calculated Value':'允许手动覆盖计算值',
                  'When checked, this will allow the user to manually override the calculated value.':'选中后，这将允许用户手动覆盖计算值。',
                  //'Calculate Value on server':'在服务器上计算值',
                  'Save':'保存',
                  'Cancel':'取消',
                  'Remove':'消除',
                  'Validate On':'验证开启',
                  'Determines when this component should trigger front-end validation.':'确定此组件何时应触发前端验证。',
                  'Change':'改变',
                  'Blur':'模糊',
                  'Required':'必需的',
                  'A required field must be filled in before the form can be submitted.':'必须先填写必填字段，然后才能提交表格。',
                  'Unique':'独特的',
                  'Makes sure the data submitted for this field is unique, and has not been submitted before.':'确保为此字段提交的数据是唯一的，并且之前没有提交过。',
                  'Minimum Length':'最小长度',
                  'The maximum length requirement this field must meet.':'此字段必须满足的最大长度要求。',
                  'Maximum Length':'最大长度',
                  'Minimum Word Length':'最小字长',
                  'The minimum amount of words that can be added to this field.':'可以添加到此字段的最小字数。',
                  'Maximum Word Length':'最大字长',
                  'The maximum amount of words that can be added to this field.':'可以添加到该字段的最大字数。',
                  'Regular Expression Pattern':'正则表达式模式',
                  'The regular expression pattern test that the field value must pass before the form can be submitted.':'表单提交前字段值必须通过的正则表达式模式测试。',
                  'Error Label':'错误标签',
                  'The label for this field when an error occurs.':'发生错误时该字段的标签。',
                  'Custom Error Message':'自定义错误消息',
                  'Error message displayed if any error occurred.':'如果发生任何错误，则会显示错误消息。',
                  'Custom Validation':'自定义验证',
                  'input':'输入',
                  'The value that was input into this component':'输入此组件的值',
                  'Enter custom validation code.':'输入自定义验证码。',
                  'You must assign the valid variable as either true or an error message if validation fails.':'如果验证失败，您必须将有效变量分配为 true 或错误消息。',
                  'Secret Validation':'秘密验证',
                  'Check this if you wish to perform the validation ONLY on the server side. This keeps your validation logic private and secret.':'如果您希望仅在服务器端执行验证，请选中此项。这使您的验证逻辑保持私密和保密。',
                  'JSONLogic Validation':'JSON逻辑验证',
                  'Execute custom logic using':'使用执行自定义逻辑',
                  'Help':'帮助',
                  'Validation':'验证',
                  'API':'API',
                  'Property Name':'属性名称',
                  'The name of this field in the API endpoint.':'API 端点中此字段的名称。',
                  'Field Tags':'字段标签',
                  'Tag the field for use in custom logic.':'标记字段以在自定义逻辑中使用。',
                  'Custom Properties':'自定义属性',
                  'This allows you to configure any custom properties for this component.':'这允许您为此组件配置任何自定义属性。',
                  'Key':'钥匙',
                  'Value':'价值',
                  'Conditional':'有条件的',
                  'Simple':'简单的',
                  'This component should Display:':'该组件应显示：',
                  'True':'真的',
                  'False':'错误的',
                  'When the form component:':'当表单组件：',
                  'Submit (submit)':'提交（提交）',
                  'Has the value:':'具有价值：',
                  'Advanced Conditions':'高级条件',
                  'Title':'标题',
                  'Advanced Logic':'高级逻辑',
                  'Advanced Logic Configured':'高级逻辑配置',
                  'Logic':'逻辑',
                  'Add Logic':'添加逻辑',
                  'Trigger':'扳机',
                  'JSON Logic':'JSON 逻辑',
                  '"row", "data", and "component" variables are available. Return "result".':'“行”、“数据”和“组件”变量可用。返回“结果”。',
                  'Actions':'行动',
                  'Action Name':'动作名称',
                  'Type':'类型',
                  'Property':'财产',
                  'Schema Defenition':'模式定义',
                  '"row", "data", "component", and "result" variables are available. Return the schema.':'“行”、“数据”、“组件”和“结果”变量可用。返回架构。',
                  'Merge Component Schema':'合并组件架构',
                  'Custom Action':'自定义操作',
                  'You must assign the show variable a boolean result.':'您必须为 show 变量分配一个布尔结果。',
                  'Note: Advanced Conditional logic will override the results of the Simple Conditional logic.':'注意：高级条件逻辑将覆盖简单条件逻辑的结果。',
                  'Example':'例子',
                  '"row", "data", "component" and "_" variables are available. Return the result to be passed to the action if truthy.':'“行”、“数据”、“组件”和“_”变量可用。如果为真，则返回要传递给操作的结果。',
                  'Add Action':'添加操作',
                  'Save Logic':'保存逻辑',
                  'Logic Name':'逻辑名称',
                  'Event':'事件',
                  'The event that will trigger this logic. You can trigger events externally or via a button.':'将触发此逻辑的事件。您可以在外部或通过按钮触发事件。',
                  'Save Action':'保存操作',
                  'HTML Attributes':'HTML 属性',
                  'Attribute Name':'属性名称',
                  'Attribute Value':'属性值',
                  'Add Attribute':'添加属性',
                  'The settings inside apply only to the PDF forms.':'里面的设置仅适用于 PDF 表单。',
                  'PDF Overlay':'PDF 叠加',
                  'Style':'风格',
                  'Custom styles that should be applied to this component when rendered in PDF.':'在 PDF 中呈现时应应用于此组件的自定义样式。',
                  'Page':'页',
                  'The PDF page to place this component.':'放置此组件的 PDF 页面。',
                  'Left':'剩下',
                  'The left margin within a page to place this component.':'页面内用于放置此组件的左边距。',
                  'The top margin within a page to place this component.':'页面内用于放置此组件的上边距。',
                  'Width':'宽度',
                  'The width of the component (in pixels).':'组件的宽度（以像素为单位）。',
                  'Height':'高度',
                  'The height of the component (in pixels).':'组件的高度（以像素为单位）。',
                  'Use Thousands Separator':'使用千位分隔符',
                  'Separate thousands by local delimiter.':'用本地分隔符分隔数千。',
                  'Decimal Places':'小数位',
                  'The maximum number of decimal places.':'最大小数位数。',
                  'Require Decimal':'需要十进制',
                  'Always show decimals, even if trailing zeros.':'始终显示小数，即使尾随零。',
                  'Minimum Value':'最小值',
                  'The minimum value this field must have before the form can be submitted.':'在提交表单之前该字段必须具有的最小值。',
                  'Maximum Value':'最大值',
                  'The maximum value this field can have before the form can be submitted.':'在提交表单之前该字段可以具有的最大值。',
                  'Editor':'编辑',
                  'Select the type of WYSIWYG editor to use for this text area.':'选择用于此文本区域的 WYSIWYG 编辑器类型。',
                  'ACE':'高手',
                  'Save As':'另存为',
                  'This setting determines how the value should be entered and stored in the database.':'此设置确定应如何输入值并将其存储在数据库中。',
                  'String':'细绳',
                  'JSON':'JSON',
                  'HTML':'HTML',
                  'Input Type':'输入类型',
                  'This is the input type used for this checkbox.':'这是用于此复选框的输入类型。',
                  'Shortcut':'捷径',
                  'Shortcut for this component.':'此组件的快捷方式。',
                  'Password fields are automatically encrypted using 1-way salted bcrypt hashes. These hashes are also protected and not returned in the API.':'密码字段使用单向加盐 bcrypt 哈希自动加密。这些哈希值也受到保护，不会在 API 中返回。',
                  'Options Label Position':'选项标签位置',
                  'Position for the label for options for this field.':'此字段选项标签的位置。',
                  'Right':'对',
                  'Inline Layout':'内联布局',
                  'Displays the checkboxes/radios horizontally.':'水平显示复选框/单选框。',
                  'Checkbox':'复选框',
                  'Allow only available values':'仅允许可用值',
                  'Minimum checked number':'最小检查数',
                  'Minimum checkboxes required before form can be submitted.':'提交表单之前需要最少的复选框。',
                  'Maximum checked number':'最大检查数',
                  'Maximum checkboxes possible before form can be submitted.':'在提交表单之前可能的最大复选框。',
                  'Minimum checked error message':'最小检查错误消息',
                  'Error message displayed if minimum number of items not checked.':'如果未检查最小项目数，则会显示错误消息。',
                  'Maximum checked error message':'最大检查错误消息',
                  'Error message displayed if maximum number of items checked.':'如果检查了最大项目数，则会显示错误消息。',
                  'ChoicesJS':'选择JS',
                  'HTML 5':'HTML 5',
                  'Unique Options':'独特的选择',
                  'Display only unique dropdown options.':'仅显示唯一的下拉选项。',
                  'Data Source Type':'数据源类型',
                  'The source to use for the select data. Values lets you provide your own values and labels. JSON lets you provide raw JSON data. URL lets you provide a URL to retrieve the JSON data from.':'用于选择数据的源。值允许您提供自己的值和标签。 JSON 允许您提供原始 JSON 数据。 URL 允许您提供一个 URL 以从中检索 JSON 数据。',
                  'Values':'价值观',
                  'Raw JSON':'原始 JSON',
                  'IndexedDB':'索引数据库',
                  'Database name':'数据库名称',
                  'The name of the indexeddb database.':'indexeddb 数据库的名称。',
                  'Storage Type':'存储类型',
                  'Database name':'数据库名称',
                  'The name of the indexeddb database.':'indexeddb 数据库的名称。',
                  'The type to store the data. If you select something other than autotype, it will force it to that type.':'存储数据的类型。如果您选择自动输入以外的其他内容，它将强制它使用该类型。',
                  'Autotype':'复写',
                  'Boolean':'布尔值',
                  'Object':'目的',
                  'ID Path':'标识路径',
                  'Path to the select option id.':'选择选项 ID 的路径。',
                  'Table name':'表名',
                  'The name of table in the indexeddb database.':'indexeddb 数据库中的表名。',
                  'Row Filter':'行过滤器',
                  'Filter table items that match the object.':'筛选与对象匹配的表项。',
                  'Item Template':'物品模板',
                  'The HTML template for the result data items.':'结果数据项的 HTML 模板。',
                  'Enable Static Search ':'启用静态搜索',
                  'When checked, the select dropdown will allow for searching within the static list of items provided.':'选中后，选择下拉菜单将允许在提供的静态项目列表中进行搜索。',
                  'Search Threshold':'搜索阈值',
                  'At what point does the match algorithm give up. A threshold of 0.0 requires a perfect match, a threshold of 1.0 would match anything.':'匹配算法在什么时候放弃。 0.0 的阈值需要完美匹配，1.0 的阈值可以匹配任何内容。',
                  'Read Only Value':'只读值',
                  'Check this if you would like to show just the value when in Read Only mode.':'如果您只想在只读模式下显示值，请选中此项。',
                  'Choices.js options':'Choices.js 选项',
                  'A raw JSON object to use as options for the Select component (Choices JS).':'用作 Select 组件 (Choices JS) 选项的原始 JSON 对象。',
                  'Use exact search':'使用精确搜索',
                  'Disables search algorithm threshold.':'禁用搜索算法阈值。',
                  'Theme':'主题',
                  'The color theme of this button.':'此按钮的颜色主题。',
                  'Size':'尺寸',
                  'The size of this button':'此按钮的大小',
                  'Block Button':'阻止按钮',
                  'This control should span the full width of the bounding container.':'此控件应跨越边界容器的整个宽度。',
                  'Left Icon':'左图标',
                  'This is the full icon class string to show the icon.':'这是显示图标的完整图标类字符串。例子：',
                  'Right Icon':'右图标',
                  'This is the full icon class string to show the icon. Example:':'这是显示图标的完整图标类字符串。例子：',
                  'Primary':'基本的',
                  'Secondary':'中学',
                  'Info':'信息',
                  'Success':'成功',
                  'Danger':'危险',
                  'Warning':'警告',
                  'Size':'尺寸',
                  'The size of this button.':'此按钮的大小。',
                  'Medium':'中等的',
                  'Extra Small':'超小号',
                  'Small':'小的',
                  'Large':'大',
                  'Disable on Form Invalid':'禁用表单无效',
                  'This will disable this field if the form is invalid.':'如果表单无效，这将禁用此字段。',
                  'Key topics for Sentiment Analysis':'情绪分析的关键主题',
                  'Enter topics to use in sentiment Analysis':'输入要在情绪分析中使用的主题',
                  'Kickbox':'跆拳道',
                  'Enable':'使能够',
                  'Enable Kickbox validation for this email field.':'为此电子邮件字段启用 Kickbox 验证。',
                  'Validate this email using the Kickbox email validation service.':'使用 Kickbox 电子邮件验证服务验证此电子邮件。',
                  'Input Mask Placeholder Char':'输入掩码占位符字符',
                  'Enable Manual Mode':'启用手动模式',
                  'Should Manual Mode be enabled for that component or not.':'是否应该为该组件启用手动模式。',
                  'Switch To Manual Mode Label':'切换到手动模式标签',
                  'The label for the checkbox used to switch to manual mode.':'用于切换到手动模式的复选框的标签。',
                  'Disable Clear Icon':'禁用清除图标',
                  'Clear Icon allows easily clear components value.':'清除图标可以轻松清除组件的值。',
                  'Provider':'提供者',
                  'Which address search service should be used.':'应该使用哪个地址搜索服务。',
                  'Manual Mode View String':'手动模式查看字符串',
                  'Specify template which should be when quering view string for the component value entered in manual mode. This string is used in table view, CSV export and email rendering. When left blank combined value of all components joined with comma will be used.':'指定在查询手动模式下输入的组件值的视图字符串时应使用的模板。此字符串用于表格视图、CSV 导出和电子邮件呈现。当留空时，将使用用逗号连接的所有组件的组合值。',
                  'Azure Maps':'Azure 地图',
                  'Google Maps':'谷歌地图',
                  'API Key':'API 密钥',
                  'Use your Google API key here.':'在此处使用您的 Google API 密钥。',
                  'Provider options':'提供者选项',
                  'Manual Mode View String':'手动模式查看字符串',
                  'Specify template which should be when quering view string for the component value entered in manual mode. This string is used in table view, CSV export and email rendering. When left blank combined value of all components joined with comma will be used.':'指定在查询手动模式下输入的组件值的视图字符串时应使用的模板。此字符串用于表格视图、CSV 导出和电子邮件呈现。当留空时，将使用用逗号连接的所有组件的组合值。',
                  'Delimiter':'分隔符',
                  'What is used to separate the tags.':'什么是用来分隔标签的。',
                  'Max Tags':'最大标签',
                  'The maximum amount of tags that can be added. 0 for infinity.':'可以添加的最大标签数量。 0 表示无穷大。',
                  'Store As':'存储为',
                  'String (CSV)':'字符串 (CSV)',
                  'Array of Tags':'标签数组',
                  'Display in Timezone':'时区显示',
                  'This will display the captured date time in the select timezone.':'这将在选择的时区显示捕获的日期时间。',
                  //'Date / Time':'约会时间',
                  //'Display in Timezone':'时区显示',
                  //'This will display the captured date time in the select timezone.':'这将在选择的时区显示捕获的日期时间。',
                  'of Viewer':'观看者',
                  'of Submission':'提交的',
                  'of Location':'地点',
                  'UTC':'世界标准时间',
                  'Use Locale Settings':'使用区域设置',
                  'Use locale settings to display date and time.':'使用区域设置显示日期和时间。',
                  //'Use Locale Settings':'使用区域设置',
                  //'Use locale settings to display date and time.':'使用区域设置显示日期和时间。',
                  'Allow Manual Input':'允许手动输入',
                  'Check this if you would like to allow the user to manually enter in the date.':'如果您希望允许用户手动输入日期，请​​选中此项。',
                  'Format':'格式',
                  'The date format for displaying the datetime value.':'用于显示日期时间值的日期格式。',
                  'Shortcut Buttons':'快捷按钮',
                  'You can specify few buttons which will be shown above the calendar. Use Label to specify the name of the button and onClick to specify which date/time will be set when user clicks the button. ':'您可以指定几个将显示在日历上方的按钮。使用 Label 指定按钮的名称，使用 onClick 指定用户单击按钮时将设置的日期/时间。',
                  //'Label':'标签',
                  'onClick':'点击',
                  'Enable Date Input':'启用日期输入',
                  'Enables date input for this field.':'启用此字段的日期输入。',
                  'Use Input to add moment.js for minDate':'使用 Input 为 minDate 添加 moment.js',
                  'Enables to use input for moment functions instead of calendar.':'允许将输入用于时刻功能而不是日历。',
                  'Use calendar to set minDate':'使用日历设置 minDate',
                  'Enables to use calendar to set date.':'允许使用日历来设置日期。',
                  'Use Input to add moment.js for maxDate':'使用 Input 为 maxDate 添加 moment.js',
                  //'Enables to use input for moment functions instead of calendar.':'允许将输入用于时刻功能而不是日历。',
                  'Use calendar to set maxDate':'使用日历设置 maxDate',
                  //'Enables to use calendar to set date.':'允许使用日历来设置日期。',
                  'Disable specific dates or dates by range':'按范围禁用特定日期或日期',
                  'Add dates that you want to blacklist. For example:':'添加要列入黑名单的日期。例如:',
                  'Custom Disabled Dates':'自定义禁用日期',
                  'date':'日期',
                  'The date object.':'日期对象。',
                  'Data Format':'数据格式',
                  'The moment.js format for saving the value of this field.':'用于保存该字段值的 moment.js 格式。',
                  'HTML5 Time Input':'HTML5 时间输入',
                  'Text Input with Mask':'带掩码的文本输入',
                  'Disable weekends':'禁用周末',
                  'Disable weekdays':'禁用工作日',
                  'Check to disable weekends':'检查以禁用周末',
                  'Check to disable weekdays':'检查以禁用工作日',
                  'Enable Time Input':'启用时间输入',
                  'Enables time input for this field':'启用此字段的时间输入',
                  'Hour Step Size':'小时步长',
                  'The number of hours to increment/decrement in the time picker.':'在时间选择器中增加/减少的小时数。',
                  'Minute Step Size':'分钟步长',
                  'The number of minutes to increment/decrement in the time picker.':'在时间选择器中增加/减少的分钟数。',
                  'Display time in 12 hour time with AM/PM.':'以上午/下午的 12 小时时间显示时间。',
                  '12 Hour Time (AM/PM)':'12 小时制（上午/下午）',
                  'Default Date':'默认日期',
                  'You can use Moment.js functions to set the default value to a specific date. For example:':'您可以使用 Moment.js 函数将默认值设置为特定日期。例如：',
                  'Flatpickr options':'Flatpickr 选项',
                  'HTML Tag':'HTML 标签',
                  'The tag of this HTML element.':'此 HTML 元素的标记。',
                  'CSS Class':'CSS 类',
                  'Attributes':'属性',
                  'The attributes for this HTML element. Only safe attributes are allowed, such as src, href, and title.':'此 HTML 元素的属性。只允许使用安全属性，例如 src、href 和 title。',
                  'Attribute':'属性',
                  'Refresh On Change':'更改时刷新',
                  'HTML Element':'HTML 元素',
                  'Column Properties':'列属性',
                  'The width, offset, push, and pull settings for each column.':'每列的宽度、偏移、推和拉设置。',
                  'Offset':'抵消',
                  'Push':'推',
                  'Pull':'拉',
                  'Auto adjust columns':'自动调整列',
                  'Will automatically adjust columns based on if nested components are hidden.':'将根据嵌套组件是否隐藏自动调整列。',
                  'Hide Column when Children Hidden':'隐藏子项时隐藏列',
                  'Check this if you would like to hide any column when the children within that column are also hidden':'如果您想在该列中的子项也被隐藏时隐藏任何列，请选中此项',
                  'Legend':'传奇',
                  'The legend for this Fieldset.':'此字段集的图例。',
                  'Default':'默认',
                  'Collapsible':'可折叠',
                  'If checked, this will turn this Panel into a collapsible panel.':'如果选中，这将把这个面板变成一个可折叠的面板。',
                  'Number of Rows':'行数',
                  'Enter the number or rows that should be displayed by this table.':'输入此表应显示的数字或行数。',
                  'Number of Columns':'列数',
                  'Enter the number or columns that should be displayed by this table.':'输入此表应显示的数字或列。',
                  'Clone Row Components':'克隆行组件',
                  'Check this if you would like to':'如果您愿意，请选中此项',
                  'Cell Alignment':'单元格对齐',
                  'Horizontal alignment for cells of the table.':'表格单元格的水平对齐方式。',
                  'Center':'中心',
                  'Striped':'有条纹的',
                  'This will stripe the table if checked.':'如果选中，这将对表格进行条带化。',
                  'Bordered':'有边框的',
                  'This will border the table if checked.':'如果选中，这将使表格边框。',
                  'Hover':'徘徊',
                  'Highlight a row on hover.':'悬停时突出显示一行。',
                  'Condensed':'浓缩的',
                  'Condense the size of the table.':'压缩表的大小。',
                  'Label for Key column':'键列的标签',
                  'Provide a label text for Key column (otherwise Key will be used)':'为 Key 列提供标签文本（否则将使用“Key”）',
                  'Disable Adding / Removing Rows':'禁用添加/删除行',
                  'Check if you want to hide Add Another button and Remove Row button':'检查是否要隐藏添加另一个按钮和删除行按钮',
                  'Show key column before value':'在值之前显示键列',
                  'Check if you would like to show the Key before the Value column.':'检查您是否想在 Value 列之前显示 Key。',
                  'Type of event':'活动类型',
                  'Specify type of event that this reCAPTCHA would react to':'指定此 reCAPTCHA 将响应的事件类型',
                  'Form Load':'表单加载',
                  'Button Click':'按钮点击',
                  'Form':'形式',
                  'The form to load within this form component.':'要在此表单组件中加载的表单。',
                  'Form Revision':'表格修订',
                  'You can lock the nested form to a specific revision by entering the revision number here.':'您可以通过在此处输入修订号将嵌套表单锁定到特定修订。',
                  'Use Original Revision while Submissions Viewing':'查看提交时使用原始修订',
                  'Using this option will make form load the original revision (the one which was used to make a submission) when viewing a submission.':'使用此选项将使表单在查看提交时加载原始修订（用于提交的修订）。',
                  //'Use Original Revision while Submissions Viewing':'查看提交时使用原始修订',
                  //'Using this option will make form load the original revision (the one which was used to make a submission) when viewing a submission.':'使用此选项将使表单在查看提交时加载原始修订（用于提交的修订）。',
                  'Save as reference':'另存为参考',
                  'Using this option will save this field as a reference and link its value to the value of the origin record.':'使用此选项会将此字段保存为参考，并将其值链接到原始记录的值。',
                  'Select Fields':'选择字段',
                  'The properties on the resource to return as part of the options. If left blank, all properties will be returned.':'作为选项的一部分返回的资源的属性。如果留空，将返回所有属性。',
                  'Search Fields':'搜索字段',
                  'Filter Query':'过滤查询',
                  'Use this to provide additional filtering using query parameters.':'使用它来提供使用查询参数的附加过滤。',
                  'The filter query for results.':'结果的过滤器查询。',
                  'Sort Query':'排序查询',
                  'Use this to provide additional sorting using query parameters':'使用它来使用查询参数提供额外的排序',
                  'The sort query for results':'结果的排序查询',
                  'Add Resource':'添加资源',
                  'Allows to create a new resource while entering a submission.':'允许在输入提交时创建新资源。',
                  'Add Resource Label':'添加资源标签',
                  'Set the text of the Add Resource button.':'设置添加资源按钮的文本。',
							  }
							}}}{...props} />
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    form: { display: "form" },
    saveText: <Translation>{(t)=>t("save_preview")}</Translation>,
    errors: selectError("form", state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveForm: (form) => {
      form = addHiddenApplicationComponent(form);
      const newForm = {
        ...form,
        tags: ["common"],
      };
      newForm.submissionAccess = SUBMISSION_ACCESS;
      dispatch(
        saveForm("form", newForm, (err, form) => {
          if (!err) {
            // ownProps.setPreviewMode(true);
            dispatch(push(`/formflow/${form._id}/view-edit/`));
          }
        })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
