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
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
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
                                            'data-bs-target="#controllers-links-module-AppModule-27df4935a6710f4cb1448d90ece55ecc2f4ce834e2de4760ec64a3db9e1e5a2a85591fdd8e4cf4b08244bf2a55c5728f5c46dbe0bc9a32317549eba0c67eb37c"' : 'data-bs-target="#xs-controllers-links-module-AppModule-27df4935a6710f4cb1448d90ece55ecc2f4ce834e2de4760ec64a3db9e1e5a2a85591fdd8e4cf4b08244bf2a55c5728f5c46dbe0bc9a32317549eba0c67eb37c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-27df4935a6710f4cb1448d90ece55ecc2f4ce834e2de4760ec64a3db9e1e5a2a85591fdd8e4cf4b08244bf2a55c5728f5c46dbe0bc9a32317549eba0c67eb37c"' :
                                            'id="xs-controllers-links-module-AppModule-27df4935a6710f4cb1448d90ece55ecc2f4ce834e2de4760ec64a3db9e1e5a2a85591fdd8e4cf4b08244bf2a55c5728f5c46dbe0bc9a32317549eba0c67eb37c"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-27df4935a6710f4cb1448d90ece55ecc2f4ce834e2de4760ec64a3db9e1e5a2a85591fdd8e4cf4b08244bf2a55c5728f5c46dbe0bc9a32317549eba0c67eb37c"' : 'data-bs-target="#xs-injectables-links-module-AppModule-27df4935a6710f4cb1448d90ece55ecc2f4ce834e2de4760ec64a3db9e1e5a2a85591fdd8e4cf4b08244bf2a55c5728f5c46dbe0bc9a32317549eba0c67eb37c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-27df4935a6710f4cb1448d90ece55ecc2f4ce834e2de4760ec64a3db9e1e5a2a85591fdd8e4cf4b08244bf2a55c5728f5c46dbe0bc9a32317549eba0c67eb37c"' :
                                        'id="xs-injectables-links-module-AppModule-27df4935a6710f4cb1448d90ece55ecc2f4ce834e2de4760ec64a3db9e1e5a2a85591fdd8e4cf4b08244bf2a55c5728f5c46dbe0bc9a32317549eba0c67eb37c"' }>
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
                                            'data-bs-target="#controllers-links-module-AuthModule-d3fc9e39f84ce0872ddcfebd0222d37725058296472049f483c66f87bace70b81e554b7395ff29b17f7a11001beec3d4aa720c2f5bcfda2985792d97fa2031ef"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-d3fc9e39f84ce0872ddcfebd0222d37725058296472049f483c66f87bace70b81e554b7395ff29b17f7a11001beec3d4aa720c2f5bcfda2985792d97fa2031ef"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-d3fc9e39f84ce0872ddcfebd0222d37725058296472049f483c66f87bace70b81e554b7395ff29b17f7a11001beec3d4aa720c2f5bcfda2985792d97fa2031ef"' :
                                            'id="xs-controllers-links-module-AuthModule-d3fc9e39f84ce0872ddcfebd0222d37725058296472049f483c66f87bace70b81e554b7395ff29b17f7a11001beec3d4aa720c2f5bcfda2985792d97fa2031ef"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-d3fc9e39f84ce0872ddcfebd0222d37725058296472049f483c66f87bace70b81e554b7395ff29b17f7a11001beec3d4aa720c2f5bcfda2985792d97fa2031ef"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-d3fc9e39f84ce0872ddcfebd0222d37725058296472049f483c66f87bace70b81e554b7395ff29b17f7a11001beec3d4aa720c2f5bcfda2985792d97fa2031ef"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-d3fc9e39f84ce0872ddcfebd0222d37725058296472049f483c66f87bace70b81e554b7395ff29b17f7a11001beec3d4aa720c2f5bcfda2985792d97fa2031ef"' :
                                        'id="xs-injectables-links-module-AuthModule-d3fc9e39f84ce0872ddcfebd0222d37725058296472049f483c66f87bace70b81e554b7395ff29b17f7a11001beec3d4aa720c2f5bcfda2985792d97fa2031ef"' }>
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
                                            'data-bs-target="#controllers-links-module-PostsModule-6688dd3eacbb36352a5e010b4e02080a986b023095a1f2c8a32057b43dcf5530ca7e76a702b97f2f502ae67a2755beb826fc5792928ca40f696813242c97bc9e"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-6688dd3eacbb36352a5e010b4e02080a986b023095a1f2c8a32057b43dcf5530ca7e76a702b97f2f502ae67a2755beb826fc5792928ca40f696813242c97bc9e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-6688dd3eacbb36352a5e010b4e02080a986b023095a1f2c8a32057b43dcf5530ca7e76a702b97f2f502ae67a2755beb826fc5792928ca40f696813242c97bc9e"' :
                                            'id="xs-controllers-links-module-PostsModule-6688dd3eacbb36352a5e010b4e02080a986b023095a1f2c8a32057b43dcf5530ca7e76a702b97f2f502ae67a2755beb826fc5792928ca40f696813242c97bc9e"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-6688dd3eacbb36352a5e010b4e02080a986b023095a1f2c8a32057b43dcf5530ca7e76a702b97f2f502ae67a2755beb826fc5792928ca40f696813242c97bc9e"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-6688dd3eacbb36352a5e010b4e02080a986b023095a1f2c8a32057b43dcf5530ca7e76a702b97f2f502ae67a2755beb826fc5792928ca40f696813242c97bc9e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-6688dd3eacbb36352a5e010b4e02080a986b023095a1f2c8a32057b43dcf5530ca7e76a702b97f2f502ae67a2755beb826fc5792928ca40f696813242c97bc9e"' :
                                        'id="xs-injectables-links-module-PostsModule-6688dd3eacbb36352a5e010b4e02080a986b023095a1f2c8a32057b43dcf5530ca7e76a702b97f2f502ae67a2755beb826fc5792928ca40f696813242c97bc9e"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-be231828de2f8e1ba35b5e1826b992fc536ad4edae3d6d26fdee5ac05921db5ef31bf858bbe4f808b5a4e92ba0507a63928812fda75ffbdf7b6831b4584e36e9"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-be231828de2f8e1ba35b5e1826b992fc536ad4edae3d6d26fdee5ac05921db5ef31bf858bbe4f808b5a4e92ba0507a63928812fda75ffbdf7b6831b4584e36e9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-be231828de2f8e1ba35b5e1826b992fc536ad4edae3d6d26fdee5ac05921db5ef31bf858bbe4f808b5a4e92ba0507a63928812fda75ffbdf7b6831b4584e36e9"' :
                                            'id="xs-controllers-links-module-UsersModule-be231828de2f8e1ba35b5e1826b992fc536ad4edae3d6d26fdee5ac05921db5ef31bf858bbe4f808b5a4e92ba0507a63928812fda75ffbdf7b6831b4584e36e9"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-be231828de2f8e1ba35b5e1826b992fc536ad4edae3d6d26fdee5ac05921db5ef31bf858bbe4f808b5a4e92ba0507a63928812fda75ffbdf7b6831b4584e36e9"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-be231828de2f8e1ba35b5e1826b992fc536ad4edae3d6d26fdee5ac05921db5ef31bf858bbe4f808b5a4e92ba0507a63928812fda75ffbdf7b6831b4584e36e9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-be231828de2f8e1ba35b5e1826b992fc536ad4edae3d6d26fdee5ac05921db5ef31bf858bbe4f808b5a4e92ba0507a63928812fda75ffbdf7b6831b4584e36e9"' :
                                        'id="xs-injectables-links-module-UsersModule-be231828de2f8e1ba35b5e1826b992fc536ad4edae3d6d26fdee5ac05921db5ef31bf858bbe4f808b5a4e92ba0507a63928812fda75ffbdf7b6831b4584e36e9"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
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
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
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
                        </ul>
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