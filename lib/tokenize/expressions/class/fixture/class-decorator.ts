@Controller('api/v1/parse')
export class ParseController {}

@Injectable()
export class GithubService {
    constructor(
        @Inject('OCTOKIT') private readonly octokit: Octokit
    ) {}
}