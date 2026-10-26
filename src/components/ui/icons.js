/*
 * Mapa clave → ícono para todo el sitio.
 * Importación por ruta individual: Vite no procesa el barrel completo de @mui/icons-material.
 */
import HiveOutlined from '@mui/icons-material/HiveOutlined';
import EngineeringOutlined from '@mui/icons-material/EngineeringOutlined';
import MonetizationOnOutlined from '@mui/icons-material/MonetizationOnOutlined';
import ForestOutlined from '@mui/icons-material/ForestOutlined';
import AssuredWorkloadOutlined from '@mui/icons-material/AssuredWorkloadOutlined';
import DashboardCustomizeOutlined from '@mui/icons-material/DashboardCustomizeOutlined';
import ReportProblemOutlined from '@mui/icons-material/ReportProblemOutlined';
import GridViewOutlined from '@mui/icons-material/GridViewOutlined';
import SpeedOutlined from '@mui/icons-material/SpeedOutlined';
import AssignmentTurnedInOutlined from '@mui/icons-material/AssignmentTurnedInOutlined';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import CalculateOutlined from '@mui/icons-material/CalculateOutlined';
import ComputerOutlined from '@mui/icons-material/ComputerOutlined';
import GavelOutlined from '@mui/icons-material/GavelOutlined';
import InsertChartOutlined from '@mui/icons-material/InsertChartOutlined';
import CreditScoreOutlined from '@mui/icons-material/CreditScoreOutlined';
import LeaderboardOutlined from '@mui/icons-material/LeaderboardOutlined';
import WaterDropOutlined from '@mui/icons-material/WaterDropOutlined';
import AdminPanelSettingsOutlined from '@mui/icons-material/AdminPanelSettingsOutlined';
import HistoryOutlined from '@mui/icons-material/HistoryOutlined';
import LanguageOutlined from '@mui/icons-material/LanguageOutlined';
import CloudOutlined from '@mui/icons-material/CloudOutlined';
import BusinessOutlined from '@mui/icons-material/BusinessOutlined';
import WarningAmberOutlined from '@mui/icons-material/WarningAmberOutlined';
import SecurityOutlined from '@mui/icons-material/SecurityOutlined';
import AccountBalanceWalletOutlined from '@mui/icons-material/AccountBalanceWalletOutlined';
import Diversity3Outlined from '@mui/icons-material/Diversity3Outlined';
import LocalAtmOutlined from '@mui/icons-material/LocalAtmOutlined';
import TrendingDownOutlined from '@mui/icons-material/TrendingDownOutlined';
import AccountTreeOutlined from '@mui/icons-material/AccountTreeOutlined';
import GroupsOutlined from '@mui/icons-material/GroupsOutlined';
import DevicesOutlined from '@mui/icons-material/DevicesOutlined';
import DeviceHubOutlined from '@mui/icons-material/DeviceHubOutlined';
import TroubleshootOutlined from '@mui/icons-material/TroubleshootOutlined';
import AccountBalanceOutlined from '@mui/icons-material/AccountBalanceOutlined';
import BalanceOutlined from '@mui/icons-material/BalanceOutlined';
import AddTaskOutlined from '@mui/icons-material/AddTaskOutlined';
import PriceCheckOutlined from '@mui/icons-material/PriceCheckOutlined';
import LanOutlined from '@mui/icons-material/LanOutlined';
import CorporateFareOutlined from '@mui/icons-material/CorporateFareOutlined';
// Íconos de los módulos del Home real de TAR (mismas variantes que la app)
import CreditScore from '@mui/icons-material/CreditScore';
import AccountBalance from '@mui/icons-material/AccountBalance';
import CurrencyExchange from '@mui/icons-material/CurrencyExchange';
import Security from '@mui/icons-material/Security';
import LocationCity from '@mui/icons-material/LocationCity';
import MenuBookRounded from '@mui/icons-material/MenuBookRounded';
import Hive from '@mui/icons-material/Hive';

export const ICONS = {
  hive: HiveOutlined,
  hiveFill: Hive,
  // Módulos reales de TAR
  rc: CreditScore,
  ro: AccountBalance,
  rl: CurrencyExchange,
  laft: Security,
  laftCustom: LocationCity,
  manuales: MenuBookRounded,
  // Servicios
  estrategico: EngineeringOutlined,
  financiero: MonetizationOnOutlined,
  ambiental: ForestOutlined,
  gestion: AssuredWorkloadOutlined,
  software: DashboardCustomizeOutlined,
  // Módulos TAR
  eventos: ReportProblemOutlined,
  matriz: GridViewOutlined,
  kri: SpeedOutlined,
  planes: AssignmentTurnedInOutlined,
  catalogos: CategoryOutlined,
  ama: CalculateOutlined,
  tecnologico: ComputerOutlined,
  legal: GavelOutlined,
  reportes: InsertChartOutlined,
  credito: CreditScoreOutlined,
  scorecard: LeaderboardOutlined,
  liquidez: WaterDropOutlined,
  // Plataforma
  roles: AdminPanelSettingsOutlined,
  auditoria: HistoryOutlined,
  web: LanguageOutlined,
  despliegue: CloudOutlined,
  // Capacidades de servicios (íconos del sitio original)
  business: BusinessOutlined,
  warning: WarningAmberOutlined,
  security: SecurityOutlined,
  wallet: AccountBalanceWalletOutlined,
  diversity: Diversity3Outlined,
  atm: LocalAtmOutlined,
  trendingDown: TrendingDownOutlined,
  accountTree: AccountTreeOutlined,
  groups: GroupsOutlined,
  devices: DevicesOutlined,
  deviceHub: DeviceHubOutlined,
  troubleshoot: TroubleshootOutlined,
  bank: AccountBalanceOutlined,
  balance: BalanceOutlined,
  addTask: AddTaskOutlined,
  priceCheck: PriceCheckOutlined,
  lan: LanOutlined,
  corporate: CorporateFareOutlined,
  computer: ComputerOutlined,
  gavel: GavelOutlined,
};

/** Devuelve el componente de ícono; si la clave no existe usa Hive. */
export const getIcon = (key) => ICONS[key] || HiveOutlined;
