import ArticlesModule from './articles'
import RegisterModule from './register'
import ProfileModule from './profile'
import SubscriptionModule from './subscription'
import SnackbarModule from './snackbar'
import ToolbarModule from './toolbar'
import CatalogsModule from './catalogs'
import DialogModule from './dialog'
import JobsModule from './jobs'
import NanniesModule from './nannies'
import InboxModule from './inbox'
import FavouritesModule from './favourites/index'
import RecentlyViewModule from './recently-view'
import ReviewModule from './review'
import PageModule from './page'
import WwcModule from './wwc'
import FBModule from './fb-sdk'
import ChatModule from './chat'
import ClubhouseModule from './clubhouse/index'
import UserModule from './user/index'
import NotificationModule from './notifications'

export const modules = {
  articles: ArticlesModule,
  dialog: DialogModule,
  catalogs: CatalogsModule,
  favourites: FavouritesModule,
  register: RegisterModule,
  profile: ProfileModule,
  subscription: SubscriptionModule,
  snackbar: SnackbarModule,
  toolbar: ToolbarModule,
  jobs: JobsModule,
  nannies: NanniesModule, // <- todo: delete
  recentlyView: RecentlyViewModule,
  reviews: ReviewModule,
  inbox: InboxModule,
  page: PageModule,
  wwc: WwcModule,
  fbSdk: FBModule,
  chat: ChatModule,
  clubhouse: ClubhouseModule,
  user: UserModule,
  notifications: NotificationModule
}
