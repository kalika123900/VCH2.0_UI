/* eslint-disable */

import React from 'react';
import Loading from 'dan-components/Loading';
import loadable from '../utils/loadable';

// Landing Page
export const HomePage = loadable(() =>
  import('./LandingPage/HomePage'), {
  fallback: <Loading />,
});
export const SliderPage = loadable(() =>
  import('./LandingPage/SliderPage'), {
  fallback: <Loading />,
});
export const BlogHome = loadable(() =>
  import('./Pages/Blog'), {
  fallback: <Loading />,
});
export const Article = loadable(() =>
  import('./Pages/Blog/Article'), {
  fallback: <Loading />,
});

// Dashboard
export const PersonalDashboard = loadable(() =>
  import('./Dashboard/PersonalDashboard'), {
  fallback: <Loading />,
});
export const ClientDashboard = loadable(() =>
  import('./Dashboard/ClientDashboard'), {
  fallback: <Loading />,
});
export const StudentDashboard = loadable(() =>
  import('./Dashboard/StudentDashboard'), {
  fallback: <Loading />,
});
export const AdminDashboard = loadable(() =>
  import('./Dashboard/AdminDashboard'), {
  fallback: <Loading />,
});
export const CrmDashboard = loadable(() =>
  import('./Dashboard/CrmDashboard'), {
  fallback: <Loading />,
});
export const CryptoDashboard = loadable(() =>
  import('./Dashboard/CryptoDashboard'), {
  fallback: <Loading />,
});

// Widgets
export const Infographics = loadable(() =>
  import('./Widgets/Infographics'), {
  fallback: <Loading />,
});
export const MiniApps = loadable(() =>
  import('./Widgets/MiniApps'), {
  fallback: <Loading />,
});
export const Analytics = loadable(() =>
  import('./Widgets/Analytics'), {
  fallback: <Loading />,
});
export const InfoUpdates = loadable(() =>
  import('./Widgets/InfoUpdates'), {
  fallback: <Loading />,
});
export const Status = loadable(() =>
  import('./Widgets/Status'), {
  fallback: <Loading />,
});
export const Demographics = loadable(() =>
  import('./Widgets/Demographics'), {
  fallback: <Loading />,
});
// export const StudentSignupFeed = loadable(() =>
//   import('./Widgets/StudentSignupFeed'), {
//   fallback: <Loading />,
// });

// Layouts
export const AppLayout = loadable(() =>
  import('./Layouts/AppLayout'), {
  fallback: <Loading />,
});
export const Responsive = loadable(() =>
  import('./Layouts/Responsive'), {
  fallback: <Loading />,
});
export const Grid = loadable(() =>
  import('./Layouts/Grid'), {
  fallback: <Loading />,
});

// Tables
export const SimpleTable = loadable(() =>
  import('./Tables/BasicTable'), {
  fallback: <Loading />,
});
export const AdvancedTable = loadable(() =>
  import('./Tables/AdvancedTable'), {
  fallback: <Loading />,
});
export const TreeTable = loadable(() =>
  import('./Tables/TreeTable'), {
  fallback: <Loading />,
});
export const EditableCell = loadable(() =>
  import('./Tables/EditableCell'), {
  fallback: <Loading />,
});
export const TablePlayground = loadable(() =>
  import('./Tables/TablePlayground'), {
  fallback: <Loading />,
});
export const MiniCampaignTable = loadable(() =>
  import('./Tables/MiniCampaignTable'), {
  fallback: <Loading />,
});
export const MiniBulkEmailTable = loadable(() =>
  import('./Tables/MiniBulkEmailTable'), {
  fallback: <Loading />,
});

// Forms
export const ReduxForm = loadable(() =>
  import('./Forms/ReduxForm'), {
  fallback: <Loading />,
});
export const DateTimePicker = loadable(() =>
  import('./Forms/DateTimePicker'), {
  fallback: <Loading />,
});
export const CheckboxRadio = loadable(() =>
  import('./Forms/CheckboxRadio'), {
  fallback: <Loading />,
});
export const Switches = loadable(() =>
  import('./Forms/Switches'), {
  fallback: <Loading />,
});
export const Selectbox = loadable(() =>
  import('./Forms/Selectbox'), {
  fallback: <Loading />,
});
export const Rating = loadable(() =>
  import('./Forms/Rating'), {
  fallback: <Loading />,
});
export const SliderRange = loadable(() =>
  import('./Forms/SliderRange'), {
  fallback: <Loading />,
});
export const Buttons = loadable(() =>
  import('./Forms/Buttons'), {
  fallback: <Loading />,
});
export const ToggleButton = loadable(() =>
  import('./Forms/ToggleButton'), {
  fallback: <Loading />,
});
export const DialButton = loadable(() =>
  import('./Forms/DialButton'), {
  fallback: <Loading />,
});
export const Textbox = loadable(() =>
  import('./Forms/Textbox'), {
  fallback: <Loading />,
});
export const Autocomplete = loadable(() =>
  import('./Forms/Autocomplete'), {
  fallback: <Loading />,
});
export const TextEditor = loadable(() =>
  import('./Forms/TextEditor'), {
  fallback: <Loading />,
});
export const Upload = loadable(() =>
  import('./Forms/Upload'), {
  fallback: <Loading />,
});

// UI Components
export const Badges = loadable(() =>
  import('./UiElements/Badges'), {
  fallback: <Loading />,
});
export const Avatars = loadable(() =>
  import('./UiElements/Avatars'), {
  fallback: <Loading />,
});
export const Accordion = loadable(() =>
  import('./UiElements/Accordion'), {
  fallback: <Loading />,
});
export const List = loadable(() =>
  import('./UiElements/List'), {
  fallback: <Loading />,
});
export const PopoverTooltip = loadable(() =>
  import('./UiElements/PopoverTooltip'), {
  fallback: <Loading />,
});
export const Snackbar = loadable(() =>
  import('./UiElements/Snackbar'), {
  fallback: <Loading />,
});
export const Typography = loadable(() =>
  import('./UiElements/Typography'), {
  fallback: <Loading />,
});
export const Tabs = loadable(() =>
  import('./UiElements/Tabs'), {
  fallback: <Loading />,
});
export const Cards = loadable(() =>
  import('./UiElements/Cards'), {
  fallback: <Loading />,
});
export const ImageGrid = loadable(() =>
  import('./UiElements/ImageGrid'), {
  fallback: <Loading />,
});
export const Progress = loadable(() =>
  import('./UiElements/Progress'), {
  fallback: <Loading />,
});
export const DialogModal = loadable(() =>
  import('./UiElements/DialogModal'), {
  fallback: <Loading />,
});
export const Steppers = loadable(() =>
  import('./UiElements/Steppers'), {
  fallback: <Loading />,
});
export const DrawerMenu = loadable(() =>
  import('./UiElements/DrawerMenu'), {
  fallback: <Loading />,
});
export const Paginations = loadable(() =>
  import('./UiElements/Paginations'), {
  fallback: <Loading />,
});
export const Breadcrumbs = loadable(() =>
  import('./UiElements/Breadcrumbs'), {
  fallback: <Loading />,
});
export const Icons = loadable(() =>
  import('./UiElements/Icons'), {
  fallback: <Loading />,
});
export const IonIcons = loadable(() =>
  import('./UiElements/IonIcons'), {
  fallback: <Loading />,
});
export const SliderCarousel = loadable(() =>
  import('./UiElements/SliderCarousel'), {
  fallback: <Loading />,
});
export const Tags = loadable(() =>
  import('./UiElements/Tags'), {
  fallback: <Loading />,
});
export const Dividers = loadable(() =>
  import('./UiElements/Dividers'), {
  fallback: <Loading />,
});

// Chart
export const LineCharts = loadable(() =>
  import('./Charts/LineCharts'), {
  fallback: <Loading />,
});
export const BarCharts = loadable(() =>
  import('./Charts/BarCharts'), {
  fallback: <Loading />,
});
export const AreaCharts = loadable(() =>
  import('./Charts/AreaCharts'), {
  fallback: <Loading />,
});
export const PieCharts = loadable(() =>
  import('./Charts/PieCharts'), {
  fallback: <Loading />,
});
export const RadarCharts = loadable(() =>
  import('./Charts/RadarCharts'), {
  fallback: <Loading />,
});
export const ScatterCharts = loadable(() =>
  import('./Charts/ScatterCharts'), {
  fallback: <Loading />,
});
export const CompossedCharts = loadable(() =>
  import('./Charts/CompossedCharts'), {
  fallback: <Loading />,
});
export const DoughnutCharts = loadable(() =>
  import('./Charts/DoughnutCharts'), {
  fallback: <Loading />,
});
export const BarDirection = loadable(() =>
  import('./Charts/BarDirection'), {
  fallback: <Loading />,
});
export const LineScatterChart = loadable(() =>
  import('./Charts/LineScatterChart'), {
  fallback: <Loading />,
});
export const AreaFilledChart = loadable(() =>
  import('./Charts/AreaFilledChart'), {
  fallback: <Loading />,
});
export const RadarPolarCharts = loadable(() =>
  import('./Charts/RadarPolarCharts'), {
  fallback: <Loading />,
});

// Pages
export const Signin = loadable(() =>
  import('./Pages/Users/Signin'), {
  fallback: <Loading />,
});
export const Signup = loadable(() =>
  import('./Pages/Users/Signup'), {
  fallback: <Loading />,
});
export const StudentSignin = loadable(() =>
  import('./Pages/Users/StudentSignin'), {
  fallback: <Loading />,
});
export const AdminSignin = loadable(() =>
  import('./Pages/Users/AdminSignin'), {
  fallback: <Loading />,
});
export const StudentSignup = loadable(() =>
  import('./Pages/Users/StudentSignup'), {
  fallback: <Loading />,
});
export const Campaigns = loadable(() =>
  import('./Pages/Campaigns'), {
  fallback: <Loading />,
});
export const CampaignManagement = loadable(() =>
  import('./Pages/CampaignManagement'), {
  fallback: <Loading />,
});
export const AdminCampaignManagement = loadable(() =>
  import('./Pages/CampaignManagement/AdminCampaignManagement'), {
  fallback: <Loading />,
});
export const CampaignDetails = loadable(() =>
  import('./Pages/CampaignManagement/CampaignDetails'), {
  fallback: <Loading />,
});
export const CampaignEdit = loadable(() =>
  import('./Pages/CampaignManagement/CampaignEdit'), {
  fallback: <Loading />,
});
export const BulkEmailEdit = loadable(() =>
  import('./Pages/BulkEmailManagement/BulkEmailEdit'), {
  fallback: <Loading />,
});
export const BulkEmailManagement = loadable(() =>
  import('./Pages/BulkEmailManagement'), {
  fallback: <Loading />,
});
export const BulkEmailDetails = loadable(() =>
  import('./Pages/BulkEmailManagement/BulkEmailDetails'), {
  fallback: <Loading />,
});
export const EditDetails = loadable(() =>
  import('./Pages/EditDetails'), {
  fallback: <Loading />,
});
export const Explore = loadable(() =>
  import('./Pages/Explore'), {
  fallback: <Loading />,
});
export const BulkEmails = loadable(() =>
  import('./Pages/BulkEmails'), {
  fallback: <Loading />,
});
export const Login = loadable(() =>
  import('./Pages/Users/Login'), {
  fallback: <Loading />,
});
export const LoginV2 = loadable(() =>
  import('./Pages/Users/LoginV2'), {
  fallback: <Loading />,
});
export const LoginV3 = loadable(() =>
  import('./Pages/Users/LoginV3'), {
  fallback: <Loading />,
});
export const Register = loadable(() =>
  import('./Pages/Users/Register'), {
  fallback: <Loading />,
});
export const RegisterV2 = loadable(() =>
  import('./Pages/Users/RegisterV2'), {
  fallback: <Loading />,
});
export const RegisterV3 = loadable(() =>
  import('./Pages/Users/RegisterV3'), {
  fallback: <Loading />,
});
export const ComingSoon = loadable(() =>
  import('./Pages/ComingSoon'), {
  fallback: <Loading />,
});
export const Profile = loadable(() =>
  import('./Pages/UserProfile'), {
  fallback: <Loading />,
});
export const StudentAccount = loadable(() =>
  import('./Pages/UserProfile/StudentAccount'), {
  fallback: <Loading />,
});
export const Timeline = loadable(() =>
  import('./Pages/Timeline'), {
  fallback: <Loading />,
});
export const BlankPage = loadable(() =>
  import('./Pages/BlankPage'), {
  fallback: <Loading />,
});
export const Pricing = loadable(() =>
  import('./Pages/Pricing'), {
  fallback: <Loading />,
});
export const Ecommerce = loadable(() =>
  import('./Pages/Ecommerce'), {
  fallback: <Loading />,
});
export const ProductPage = loadable(() =>
  import('./Pages/Ecommerce/ProductPage'), {
  fallback: <Loading />,
});
export const CheckoutPage = loadable(() =>
  import('./Pages/Ecommerce/CheckoutPage'), {
  fallback: <Loading />,
});
export const Contact = loadable(() =>
  import('./Pages/Contact'), {
  fallback: <Loading />,
});
export const ResetPassword = loadable(() =>
  import('./Pages/Users/ResetPassword'), {
  fallback: <Loading />,
});
export const LockScreen = loadable(() =>
  import('./Pages/Users/LockScreen'), {
  fallback: <Loading />,
});
export const Chat = loadable(() =>
  import('./Pages/Chat'), {
  fallback: <Loading />,
});
export const ClientMessage = loadable(() =>
  import('./Pages/Chat/ClientMessage'), {
  fallback: <Loading />,
});
export const StudentMessage = loadable(() =>
  import('./Pages/Chat/StudentMessage'), {
  fallback: <Loading />,
});
export const Email = loadable(() =>
  import('./Pages/Email'), {
  fallback: <Loading />,
});
export const ClientEmail = loadable(() =>
  import('./Pages/Email/ClientEmail'), {
  fallback: <Loading />,
});
export const StudentEmail = loadable(() =>
  import('./Pages/Email/StudentEmail'), {
  fallback: <Loading />,
});
export const Photos = loadable(() =>
  import('./Pages/Photos'), {
  fallback: <Loading />,
});
export const Calendar = loadable(() =>
  import('./Pages/Calendar'), {
  fallback: <Loading />,
});
export const TaskBoard = loadable(() =>
  import('./Pages/TaskBoard'), {
  fallback: <Loading />,
});
export const Invoice = loadable(() =>
  import('./Pages/Invoice'), {
  fallback: <Loading />,
});
export const EditStudentDetails = loadable(() =>
  import('./Pages/EditStudentDetails'), {
  fallback: <Loading />,
});
export const SeatManagement = loadable(() =>
  import('./Pages/SeatManagement'), {
  fallback: <Loading />,
});
export const AdminSeatManagement = loadable(() =>
  import('./Pages/SeatManagement/AdminSeatManagement'), {
  fallback: <Loading />,
});
export const MiniSeatTable = loadable(() =>
  import('./Pages/SeatManagement/MiniSeatTable'), {
  fallback: <Loading />,
});
export const ClientAccounts = loadable(() =>
  import('./Pages/ClientAccounts'), {
  fallback: <Loading />,
});
export const ClientProfiles = loadable(() =>
  import('./Pages/ClientProfiles'), {
  fallback: <Loading />,
});
export const StudentReview = loadable(() =>
  import('./Pages/StudentReview'), {
  fallback: <Loading />,
});
// Maps
export const MapMarker = loadable(() =>
  import('./Maps/MapMarker'), {
  fallback: <Loading />,
});
export const MapDirection = loadable(() =>
  import('./Maps/MapDirection'), {
  fallback: <Loading />,
});
export const SearchMap = loadable(() =>
  import('./Maps/SearchMap'), {
  fallback: <Loading />,
});
export const TrafficIndicator = loadable(() =>
  import('./Maps/TrafficIndicator'), {
  fallback: <Loading />,
});
export const StreetViewMap = loadable(() =>
  import('./Maps/StreetViewMap'), {
  fallback: <Loading />,
});

// Other
export const NotFound = loadable(() =>
  import('./NotFound/NotFound'), {
  fallback: <Loading />,
});
export const NotFoundDedicated = loadable(() =>
  import('./Pages/Standalone/NotFoundDedicated'), {
  fallback: <Loading />,
});
export const Error = loadable(() =>
  import('./Pages/Error'), {
  fallback: <Loading />,
});
export const Maintenance = loadable(() =>
  import('./Pages/Maintenance'), {
  fallback: <Loading />,
});
export const Parent = loadable(() =>
  import('./Parent'), {
  fallback: <Loading />,
});
export const Settings = loadable(() =>
  import('./Pages/Settings'), {
  fallback: <Loading />,
});
export const ClientSettings = loadable(() =>
  import('./Pages/ClientSettings'), {
  fallback: <Loading />,
});
export const StudentSettings = loadable(() =>
  import('./Pages/StudentSettings'), {
  fallback: <Loading />,
});
export const HelpSupport = loadable(() =>
  import('./Pages/HelpSupport'), {
  fallback: <Loading />,
});
export const CompanyProfiles = loadable(() =>
  import('./Pages/CompanyProfiles'), {
  fallback: <Loading />,
});
export const JobProfile = loadable(() =>
  import('./Pages/CompanyProfiles/JobProfile'), {
  fallback: <Loading />,
});
export const Signout = loadable(() =>
  import('./Pages/Signout'), {
  fallback: <Loading />,
});
