'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ud_nest documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-b72dec047a2aa2cb8918b066682bd38e5303f659ae811d19b5b6d49b94189cd0e077e26da4acb85460f193acf2948a2bca6c3d4349891f0a94333c17d7d86101"' : 'data-bs-target="#xs-controllers-links-module-AppModule-b72dec047a2aa2cb8918b066682bd38e5303f659ae811d19b5b6d49b94189cd0e077e26da4acb85460f193acf2948a2bca6c3d4349891f0a94333c17d7d86101"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-b72dec047a2aa2cb8918b066682bd38e5303f659ae811d19b5b6d49b94189cd0e077e26da4acb85460f193acf2948a2bca6c3d4349891f0a94333c17d7d86101"' :
                                            'id="xs-controllers-links-module-AppModule-b72dec047a2aa2cb8918b066682bd38e5303f659ae811d19b5b6d49b94189cd0e077e26da4acb85460f193acf2948a2bca6c3d4349891f0a94333c17d7d86101"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-b72dec047a2aa2cb8918b066682bd38e5303f659ae811d19b5b6d49b94189cd0e077e26da4acb85460f193acf2948a2bca6c3d4349891f0a94333c17d7d86101"' : 'data-bs-target="#xs-injectables-links-module-AppModule-b72dec047a2aa2cb8918b066682bd38e5303f659ae811d19b5b6d49b94189cd0e077e26da4acb85460f193acf2948a2bca6c3d4349891f0a94333c17d7d86101"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-b72dec047a2aa2cb8918b066682bd38e5303f659ae811d19b5b6d49b94189cd0e077e26da4acb85460f193acf2948a2bca6c3d4349891f0a94333c17d7d86101"' :
                                        'id="xs-injectables-links-module-AppModule-b72dec047a2aa2cb8918b066682bd38e5303f659ae811d19b5b6d49b94189cd0e077e26da4acb85460f193acf2948a2bca6c3d4349891f0a94333c17d7d86101"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-ea23a5918e284a12cb5093fbe23ae15a23ff3ea384acd2e063b2fb95fe8af419aa6babb62345ad6014f801ae59052fb174ddde45ffa931ea3a03c2fe85762845"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-ea23a5918e284a12cb5093fbe23ae15a23ff3ea384acd2e063b2fb95fe8af419aa6babb62345ad6014f801ae59052fb174ddde45ffa931ea3a03c2fe85762845"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-ea23a5918e284a12cb5093fbe23ae15a23ff3ea384acd2e063b2fb95fe8af419aa6babb62345ad6014f801ae59052fb174ddde45ffa931ea3a03c2fe85762845"' :
                                            'id="xs-controllers-links-module-AuthModule-ea23a5918e284a12cb5093fbe23ae15a23ff3ea384acd2e063b2fb95fe8af419aa6babb62345ad6014f801ae59052fb174ddde45ffa931ea3a03c2fe85762845"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-ea23a5918e284a12cb5093fbe23ae15a23ff3ea384acd2e063b2fb95fe8af419aa6babb62345ad6014f801ae59052fb174ddde45ffa931ea3a03c2fe85762845"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-ea23a5918e284a12cb5093fbe23ae15a23ff3ea384acd2e063b2fb95fe8af419aa6babb62345ad6014f801ae59052fb174ddde45ffa931ea3a03c2fe85762845"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-ea23a5918e284a12cb5093fbe23ae15a23ff3ea384acd2e063b2fb95fe8af419aa6babb62345ad6014f801ae59052fb174ddde45ffa931ea3a03c2fe85762845"' :
                                        'id="xs-injectables-links-module-AuthModule-ea23a5918e284a12cb5093fbe23ae15a23ff3ea384acd2e063b2fb95fe8af419aa6babb62345ad6014f801ae59052fb174ddde45ffa931ea3a03c2fe85762845"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-2cd730e5458b4a956c45f39c7306e8940d8cbf6bb1b9f8c3075fe8202073b4ff0f6bc2ea59614a558488b8d2426de4d2219d007764b051464c3de5fdceed3b47"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-2cd730e5458b4a956c45f39c7306e8940d8cbf6bb1b9f8c3075fe8202073b4ff0f6bc2ea59614a558488b8d2426de4d2219d007764b051464c3de5fdceed3b47"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-2cd730e5458b4a956c45f39c7306e8940d8cbf6bb1b9f8c3075fe8202073b4ff0f6bc2ea59614a558488b8d2426de4d2219d007764b051464c3de5fdceed3b47"' :
                                            'id="xs-controllers-links-module-PostsModule-2cd730e5458b4a956c45f39c7306e8940d8cbf6bb1b9f8c3075fe8202073b4ff0f6bc2ea59614a558488b8d2426de4d2219d007764b051464c3de5fdceed3b47"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-2cd730e5458b4a956c45f39c7306e8940d8cbf6bb1b9f8c3075fe8202073b4ff0f6bc2ea59614a558488b8d2426de4d2219d007764b051464c3de5fdceed3b47"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-2cd730e5458b4a956c45f39c7306e8940d8cbf6bb1b9f8c3075fe8202073b4ff0f6bc2ea59614a558488b8d2426de4d2219d007764b051464c3de5fdceed3b47"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-2cd730e5458b4a956c45f39c7306e8940d8cbf6bb1b9f8c3075fe8202073b4ff0f6bc2ea59614a558488b8d2426de4d2219d007764b051464c3de5fdceed3b47"' :
                                        'id="xs-injectables-links-module-PostsModule-2cd730e5458b4a956c45f39c7306e8940d8cbf6bb1b9f8c3075fe8202073b4ff0f6bc2ea59614a558488b8d2426de4d2219d007764b051464c3de5fdceed3b47"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TasksModule.html" data-type="entity-link" >TasksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TasksModule-8b76518ac8e848a4608c3e2f89d6cae3698abd0a9c74f1dc59413387f8066de76e782b1e8d81229565aad3ff8fc7caf530a12e3c0e586ffaf11029c684c6f021"' : 'data-bs-target="#xs-controllers-links-module-TasksModule-8b76518ac8e848a4608c3e2f89d6cae3698abd0a9c74f1dc59413387f8066de76e782b1e8d81229565aad3ff8fc7caf530a12e3c0e586ffaf11029c684c6f021"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TasksModule-8b76518ac8e848a4608c3e2f89d6cae3698abd0a9c74f1dc59413387f8066de76e782b1e8d81229565aad3ff8fc7caf530a12e3c0e586ffaf11029c684c6f021"' :
                                            'id="xs-controllers-links-module-TasksModule-8b76518ac8e848a4608c3e2f89d6cae3698abd0a9c74f1dc59413387f8066de76e782b1e8d81229565aad3ff8fc7caf530a12e3c0e586ffaf11029c684c6f021"' }>
                                            <li class="link">
                                                <a href="controllers/TasksController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TasksModule-8b76518ac8e848a4608c3e2f89d6cae3698abd0a9c74f1dc59413387f8066de76e782b1e8d81229565aad3ff8fc7caf530a12e3c0e586ffaf11029c684c6f021"' : 'data-bs-target="#xs-injectables-links-module-TasksModule-8b76518ac8e848a4608c3e2f89d6cae3698abd0a9c74f1dc59413387f8066de76e782b1e8d81229565aad3ff8fc7caf530a12e3c0e586ffaf11029c684c6f021"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TasksModule-8b76518ac8e848a4608c3e2f89d6cae3698abd0a9c74f1dc59413387f8066de76e782b1e8d81229565aad3ff8fc7caf530a12e3c0e586ffaf11029c684c6f021"' :
                                        'id="xs-injectables-links-module-TasksModule-8b76518ac8e848a4608c3e2f89d6cae3698abd0a9c74f1dc59413387f8066de76e782b1e8d81229565aad3ff8fc7caf530a12e3c0e586ffaf11029c684c6f021"' }>
                                        <li class="link">
                                            <a href="injectables/TasksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-c38635a8becb1dfac7019bd23a91b4f65cf6aebdd4064816c1026e277ed232292954b55c1faa785f9784b42aa82663545363bb31987730f6157d5554f3c734f0"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-c38635a8becb1dfac7019bd23a91b4f65cf6aebdd4064816c1026e277ed232292954b55c1faa785f9784b42aa82663545363bb31987730f6157d5554f3c734f0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-c38635a8becb1dfac7019bd23a91b4f65cf6aebdd4064816c1026e277ed232292954b55c1faa785f9784b42aa82663545363bb31987730f6157d5554f3c734f0"' :
                                            'id="xs-controllers-links-module-UsersModule-c38635a8becb1dfac7019bd23a91b4f65cf6aebdd4064816c1026e277ed232292954b55c1faa785f9784b42aa82663545363bb31987730f6157d5554f3c734f0"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-c38635a8becb1dfac7019bd23a91b4f65cf6aebdd4064816c1026e277ed232292954b55c1faa785f9784b42aa82663545363bb31987730f6157d5554f3c734f0"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-c38635a8becb1dfac7019bd23a91b4f65cf6aebdd4064816c1026e277ed232292954b55c1faa785f9784b42aa82663545363bb31987730f6157d5554f3c734f0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-c38635a8becb1dfac7019bd23a91b4f65cf6aebdd4064816c1026e277ed232292954b55c1faa785f9784b42aa82663545363bb31987730f6157d5554f3c734f0"' :
                                        'id="xs-injectables-links-module-UsersModule-c38635a8becb1dfac7019bd23a91b4f65cf6aebdd4064816c1026e277ed232292954b55c1faa785f9784b42aa82663545363bb31987730f6157d5554f3c734f0"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Task.html" data-type="entity-link" >Task</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionsDto.html" data-type="entity-link" >CreatePostMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTaskDto.html" data-type="entity-link" >CreateTaskDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/findOneParams.html" data-type="entity-link" >findOneParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/patchhPostDto.html" data-type="entity-link" >patchhPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TypedConfigService.html" data-type="entity-link" >TypedConfigService</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTaskDto.html" data-type="entity-link" >UpdateTaskDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/updateTaskStatusDto.html" data-type="entity-link" >updateTaskStatusDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/WrongTaskStatusException.html" data-type="entity-link" >WrongTaskStatusException</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppConfig.html" data-type="entity-link" >AppConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConfigType.html" data-type="entity-link" >ConfigType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITask.html" data-type="entity-link" >ITask</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});